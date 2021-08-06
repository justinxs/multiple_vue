// 优先加载这两个事件捕获,监听系统所有没有处理的异常
process.on('uncaughtException', function (err) {
    console.error('出现意外的异常：', err.stack ? err.stack : err);
});
process.on('unhandledRejection', error => {
	console.error('系统没有处理的异常：', error.stack ? error.stack : error);
});
// 修改默认的监听限制
require('events').EventEmitter.defaultMaxListeners = 0
require('./server/main');