var os = require('os'), prettySeconds = require('pretty-seconds');

module.exports = {
	name: 'OS',
	fetch: function(cb) {
		this.logger.debug("Fetching", this.name);

		this.attributes = {
			uptime: prettySeconds( os.uptime() ),
			type: os.type(),
			platform: os.platform(),
			arch: os.arch(),
			release: os.release()
		};

		return typeof cb === 'function' ? cb(null, this.attributes) : '';
	}
}
