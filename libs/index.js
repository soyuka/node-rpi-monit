var fs = require('fs'), _ = require('underscore'), async = require('async'), path = require('path');


var getLib = function(file, cb) {
	var p = path.join(__dirname, file);

	require(p)(function(err, value) {

		cb(err, [path.basename(file, '.js'), value]);
	});
};

module.exports = function(cb) {
	var libs = fs.readdirSync(__dirname);

	libs = _.reject(libs, function(val){ return val === 'index.js'; });

	async.map(libs, getLib, function(err, results) {

		cb(err, _.object(results));
	});

	
}