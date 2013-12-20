var os = require('os'), _ = require('underscore');

module.exports = {
	name: 'network',
	fetch: function(cb) {
		this.logger.debug("Fetching", this.name);

		this.attributes = _.extend(os.networkInterfaces(), {hostname : os.hostname()});

		return typeof cb === 'function' ? cb(null, this.attributes) : '';
	}
}
