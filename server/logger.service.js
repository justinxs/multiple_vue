/**
 * 日志服务
 */
class LoggerService {
	constructor() {
		let logConfig = require('./log.config');
		this.loggerConfig = logConfig.loggerConfig;
		this.log4js = require('log4js');
		this.log4js.configure(this.loggerConfig);
		this.logger = this.log4js.getLogger('console');
	}

	/***
	 * 初始化
	 */
	init() {
		console.debug = this.logger.debug.bind(this.logger);
		console.log = this.logger.info.bind(this.logger);
		console.info = this.logger.info.bind(this.logger);
		console.warn = this.logger.warn.bind(this.logger);
		console.error = this.logger.error.bind(this.logger);
	}
}

module.exports = LoggerService;