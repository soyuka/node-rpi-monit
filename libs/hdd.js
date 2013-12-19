var exec = require('exec')
  , os = require('os')
  , _ = require('underscore')
  , numeral = require('numeral')
  , logger = global.logger;


var getCommand = function() {
    switch (os.platform().toLowerCase()) {
        case'darwin':
            return 'df -k';
            break;
        case'linux':
        default:
            return 'df';
    }
},
formatDrives = function(drives) {
    var map = {}, num = drives.length;

    for(var i=0; i < num; i++)
        map[drives[i].shift()] = formatDrive(drives[i]);

    return map;
},
formatDrive = function(drive) {
    var map;

    map = {
        used: numeral( drive[1] * 1024 ).format('0.00 b'),
        available: numeral( drive[2] * 1024 ).format('0.00 b'),
        percent: drive[3],
        mounted: drive[4] 
    };

    return map;
}

module.exports = function(cb) {
    var cmd = getCommand();

    logger.profile('Executing "' + cmd + '"');

    exec(getCommand(), function(err, out, code) {
            
            if(err)
                cb(err, null);

            var drives = out.split('\n');

            drives.splice(0, 1);
            drives.splice(-1, 1);

            var num = drives.length;

            while(num--)
                drives[num] = drives[num].split(/\s+/g);

            drives = _.reject(drives, function(v) { return v[0].indexOf('tmpfs') !== -1 || v[0] == 'rootfs'});

            drives = formatDrives(drives);

            logger.profile('Executing "' + cmd + '"');

            cb(null, drives);
    });
}
