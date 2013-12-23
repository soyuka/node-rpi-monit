var exec = require('exec')
  , os = require('os')
  , _ = require('underscore')
  , storage = require('../core/storage');

// console.log(new events());
//process.exit(0);
var cpu = {
	name: 'cpu',
	events: ['temp', 'loadavg'],
	update: 10000,
	autoStart: true,
	fetch: function(cb) {
        this.logger.debug("Fetching", this.name);

		var self = this;

		exec("/opt/vc/bin/vcgencmd measure_temp | grep -o '[0-9\.]*'", function(err, out, code) {
			
			var temp = parseFloat(out.replace('\n', ''));

			self.logger.info('Getting processor temp', temp);
			
			var avg = os.loadavg(),
				loadavg = {
					'1': avg[0],
					'5': avg[1],
					'10': avg[2] 
				};

			if(!self.attributes.length) {
				self.logger.info('Getting processor load avg', loadavg);

				self.attributes = {
					temp: temp + ' °C',
					cpus: os.cpus(),
					loadavg: loadavg
				};
			} else
				self.attributes = _.extend(self.attributes, {temp: temp + ' °C', loadavg: loadavg});

			var time = new Date().getTime()

			self.emit('temp', temp, time);
			self.emit('loadavg', avg, time);

			return typeof cb === 'function' ? cb(err, self.attributes) : '';
		});
	},
	sortAvg: function(stats) {
		var sorted = [];

		_.each(stats, function(e, i, list) {

			if(typeof e !== 'array')
				e = JSON.parse(e);

			for(var j in e) {

				if(!sorted[j]) {
					var name = '';

					if(j == 0)
						name = '1 min';
					else if(j == 1)
						name = '5 min';
					else if(j == 2)
						name = '10 min';

					sorted[j] = {
						name: name,
						data: []
					};
				}

				sorted[j].data.push({x: parseInt(i), y: e[j]});
			}
		});

		_.each(sorted, function(e, k) {
			e = e.data;

			sorted[k].data.sort(function(a, b) {
				return a.x > b.x ? 1 : -1;
			})
		})

		return sorted;
	},
	sortTemp: function(stats) {
		var sorted = {name: 'temp', data: []};

		_.each(stats, function(e, i, list) {
			sorted.data.push({x: parseInt(i), y: parseFloat(e)});
		});

		sorted.data.sort(function(a, b) {
			return a.x > b.x ? 1 : -1;
		});

		return sorted;
	},
	sort: function(obj, stats) {
		if(obj.option == 'loadavg')
			stats = this.sortAvg(stats);
		else if(obj.option == 'temp')
			stats = this.sortTemp(stats);
		else {
			//todo
			console.log(stats);
			stats.loadavg = this.sortAvg(stats.loadavg);
			stats.temp = this.sortTemp(stats.temp);
		}

		return stats;
	}
};


module.exports = cpu;