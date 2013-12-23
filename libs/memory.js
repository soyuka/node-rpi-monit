var os = require('os'), numeral = require('numeral'), _ = require('underscore');

module.exports = {
	name: 'memory',
	update: 10000,
	autoStart: true,
	events: ['free', 'total'],
	sort: function(obj, stats) {
		var sorted = [];

		if(obj.thing == 'memory' && !obj.hasOwnProperty('option')) {
			
			_.each(stats.total, function(total, i) {
				//calcs used memory
				var used = parseInt(total) - parseInt(stats.free[i]);

				sorted.push({
					x: parseInt(i),
					y: parseInt(used)
				});
			});

		} else {
			_.each(stats, function(e, i) {
				sorted.push({x: parseInt(i), y: parseInt(e)});
			});
		}

		sorted.sort(function(a, b) {
			return a.x > b.x ? 1 : -1;
		});

		return sorted;
	},
	fetch: function(cb) {
		this.logger.debug("Fetching", this.name);

		var total = os.totalmem(), free = os.freemem(), percent = free / total;

		this.attributes = {
			total: numeral( total ).format('0.00 b'),
			free: numeral( free ).format('0.00 b'),
			percent: numeral( percent ).format('0.00 %')
		};

		this.logger.info('Getting processor memory usage', this.attributes);

		var time = new Date().getTime();

		this.emit('free', free, time);
		this.emit('total', total, time);

		return typeof cb === 'function' ? cb(null, this.attributes) : '';
	}
}
