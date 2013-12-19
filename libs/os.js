var os = require('os')
  , numeral = require('numeral')
  , prettySeconds = require('pretty-seconds');

module.exports = function(cb) {
	var avg = os.loadavg();
	console.log(avg);
	cb(null, {
		uptime: prettySeconds( parseInt(os.uptime()) ),
		loadavg : { 
			'1':  numeral(avg[0]).format('0.00'), 
			'5':  numeral(avg[1]).format('0.00'), 
			'10': numeral(avg[2]).format('0.00') 
		},
		hostname: os.hostname(),
		// type: os.type(),
		// platform: os.platform(),
		// arch: os.arch(),
		memory: {
			total: numeral( os.totalmem() ).format('0.00 b'),
			free: numeral( os.freemem() ).format('0.00 b')
		},
		cpu: os.cpus()[0].model //Rpi should have only 1 CPU isn't it ?

	});
}


