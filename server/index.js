// 优先加载这两个事件捕获,监听系统所有没有处理的异常
process.on('uncaughtException', function (err) {
    console.error('出现意外的异常：', err.stack ? err.stack : err);
});
process.on('unhandledRejection', error => {
	console.error('系统没有处理的异常：', error.stack ? error.stack : error);
});
// 修改默认的监听限制
require('events').EventEmitter.defaultMaxListeners = 0

const koa = require('koa');
const app = new koa();
const LoggerService = require('./logger.service');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const _ = new Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');

// 入口函数
async function start() {

	const port = 8950;
	
	const loggerService = new LoggerService();
	// 初始化日志服务
	loggerService.init();

	// 允许代理字符串
	app.proxy = true;

	_.all(/\/api.*/, async (ctx, next) => {
		return await k2c(createProxyMiddleware({
			target: 'http://winlive-gw-api.nn722.com',
			changeOrigin: true,
			pathRewrite: {
			  '^/api': '', // rewrite path
			},
			logLevel: 'debug',
			logProvider: () => {
				return {
					log: loggerService.logger.log.bind(loggerService.logger),
					debug: loggerService.logger.debug.bind(loggerService.logger),
					info: loggerService.logger.info.bind(loggerService.logger),
					warn: loggerService.logger.warn.bind(loggerService.logger),
					error: loggerService.logger.error.bind(loggerService.logger)
				};
			}
		}))(ctx, next);
	})

	// 静态资源转发
	_.get(/.*\.(js|css|png|jpg|jpeg|gif|ico|xml|xsl|txt|mp3|zip|htc|swf|json|svga|heic|ttf|woff|map)/, async (ctx, next) => {
		let lastPoint = ctx.path.lastIndexOf('.');
		let resPath = path.resolve(__dirname, `../dist/${ctx.path}`);
		ctx.type = ctx.path.substr(lastPoint + 1);
		if(fs.existsSync(resPath)) {
			return ctx.body = fs.createReadStream(resPath);
		} else {
			ctx.resError = 1;
			ctx.status = 404;
			return ctx.body = '';
		}
	});

	_.get(/.*/, async (ctx, next) => {
        let matches = /^\/([^\/]+)$/.exec(ctx.path)
        let resPath = ''
        if (matches && matches[1]) {
            resPath = path.resolve(__dirname, `../dist/${matches[1]}.html`)
        } else {
            resPath = path.resolve(__dirname, `../dist/index.html`)
        }
        if (fs.existsSync(resPath)) {
            ctx.type = 'html';
            return ctx.body = fs.createReadStream(resPath);
        } else {
            ctx.resError = 1;
			ctx.status = 404;
			return ctx.body = '';
        }
	})

	app
	.use(_.routes())
	.use(_.allowedMethods());

	console.info(`listen host ${port}`);
	app.listen(port, '0.0.0.0');
}

start();