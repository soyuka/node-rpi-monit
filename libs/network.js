var os = require('os')
  , numeral = require('numeral');

module.exports = function(cb) {
	var interfaces = os.networkInterfaces();
	
	cb(null, { eth0 : interfaces.eth0[0].address });
}

