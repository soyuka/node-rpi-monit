var exec = os = require('os');

module.exports = {
	name: 'Network',
	fetch: function(cb) {
		this.logger.info("Fetching", this.name);

		this.attributes = os.networkInterfaces();

		return typeof cb === 'function' ? cb(null, this.attributes) : '';
	}
}
