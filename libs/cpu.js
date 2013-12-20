var exec = require('exec')
  , os = require('os')
  , _ = require('underscore');

// console.log(new events());
//process.exit(0);
var cpu = {
	name: 'cpu',
	events: ['temp', 'loadavg'],
	update: 10000,
	autoStart: false,
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

			self.emit('temp', temp);
			self.emit('loadavg', avg);

			return typeof cb === 'function' ? cb(err, self.attributes) : '';
		});
	}
};


module.exports = cpu;