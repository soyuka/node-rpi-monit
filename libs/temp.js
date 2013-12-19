var exec = require('exec');

module.exports = function(cb) {

	exec("/opt/vc/bin/vcgencmd measure_temp | grep -o '[0-9\.]*'", function(err, out, code) {
		global.logger.info('Getting processor temp', out);
		
		cb(err, out.replace('/\\n/gi', '') + ' °C');
	});

}
