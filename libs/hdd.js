var exec = require('exec')
  , _ = require('underscore');

var df = require('../core/diskfree');

module.exports = function(cb) {

	df.drives(function (err, drives) {

        if (err)
            return cb(err);

		drives = _.reject(drives, function(v) { return v.indexOf('tmpfs') !== -1 || v == 'rootfs'});


        df.drivesDetail(drives, function(err, drives) {

        	var map = {};

        	_.each(drives, function(d, i) {
        		map[d.drive] = {
        			available: d.available,
        			used: d.used,
        			total: d.total,
        			percent: d.percent
        		}
        	});

        	cb(err, map);

        });
    });

}
