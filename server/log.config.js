module.exports = {
	loggerConfig: {
		appenders: {
			console: {
				type: 'console'
			},
			dateFile: {
				type: 'dateFile',
				filename: 'logs/log.log',
				pattern: 'yyyy-MM-dd',
				compress: false
			}
		},
		categories: {
			default: {
				appenders: ['console', 'dateFile'],
				level: process.env.NODE_ENV == 'production' ? 'error' : 'debug'
			}
		},
		disableClustering: true
	}
}