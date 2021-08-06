const webpack = require('webpack');
const pagesConfig = require('../webpack/webpack.dev');
const themeConfig = require('../webpack/webpack.theme');
const getPages = require('../webpack/filePath').getPages;
var nodemon = require('nodemon');

const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const path = require('path');

const spinner = ora('building...');
spinner.start();

var isFirst = true;

let complie = webpack([...pagesConfig, ...themeConfig]);

// 删除dist
rm.sync(path.resolve(__dirname, '../dist'));
complie.watch({
	// Example watchOptions
	aggregateTimeout: 300,
	poll: undefined
}, (err, stats) => {
	spinner.stop();
	if(isFirst) {
		nodemon('--watch src -e js,scss,vue --watch server -e js --ignore node_modules/**node_modules --inspect=9329 ./server/index.js')
		isFirst = false;
	}

	if (err) {
		console.error(chalk.red(err.stack || err));
		if (err.details) {
			console.log(chalk.red(err.details));
		}
	} else {
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
			chunks: false,
			chunkModules: false,
			cachedAssets: false,
			entrypoints: false
		}) + '\n\n');

        // 删除无关的themes js
        let themePaths = getPages().map(name => path.resolve(__dirname, `../dist/pages/${name}/themes/js`))
        themePaths.forEach(p => rm.sync(p));

		console.log(chalk.cyan('  Build complete.\n'))
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		console.error(info.errors);
	}

	if (stats.hasWarnings()) {
		console.warn(info.warnings);
	}
});

nodemon.on('start', function () {
	console.log('App has started');
}).on('quit', function () {
	console.log('App has quit');
	process.exit();
}).on('restart', function (files) {
	console.log('App restarted due to: ', files);
});
