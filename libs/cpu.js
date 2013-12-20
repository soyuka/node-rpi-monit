var exec = require('exec')
  , os = require('os')
  , _ = require('underscore');

// console.log(new events());
//process.exit(0);
var cpu = {
	name: 'CPU',
	update: 10000,
	fetch: function(cb) {
        this.logger.info("Fetching", this.name);

		var self = this;

		exec("/opt/vc/bin/vcgencmd measure_temp | grep -o '[0-9\.]*'", function(err, out, code) {
			
			var temp = out.replace('\n', '');
				temp += ' °C';

			self.logger.info('Getting processor temp', temp);
			
			self.attributes = {
				temp: temp,
				cpus: os.cpus()
			};

			self.emit('cpu:infos');

			return typeof cb === 'function' ? cb(err, self.attributes) : '';
		});
	}
};


module.exports = cpu;