var os = require('os'), numeral = require('numeral');

module.exports = {
	name: 'memory',
	update: 10000,
	autoStart: false,
	events: ['free', 'total'],
	fetch: function(cb) {
		this.logger.debug("Fetching", this.name);

		var total = os.totalmem(), free = os.freemem(), percent = free / total;

		this.attributes = {
			total: numeral( total ).format('0.00 b'),
			free: numeral( free ).format('0.00 b'),
			percent: numeral( percent ).format('0.00 %')
		};

		this.logger.info('Getting processor memory usage', this.attributes);

		this.emit('free', free);
		this.emit('total', total);

		return typeof cb === 'function' ? cb(null, this.attributes) : '';
	}
}
