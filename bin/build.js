const webpack = require('webpack');
const pagesConfig = require('../webpack/webpack.prod');
const getPages = require('../webpack/filePath').getPages;
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const path = require('path');

const spinner = ora('building...');
spinner.start();

let complie = webpack([...pagesConfig]);

// 删除dist
rm.sync(path.resolve(__dirname, '../dist'));

complie.run((err, stats) => {
	spinner.stop();

	if (err) {
		console.error(chalk.red(err.stack || err));
		if (err.details) {
			console.log(chalk.red(err.details));
		}
		return;
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