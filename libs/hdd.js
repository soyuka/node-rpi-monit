var exec = require('exec')
  , os = require('os')
  , _ = require('underscore')
  , numeral = require('numeral');

module.exports = {
    name: 'HDD',
    getCommand: function() {
        switch (os.platform().toLowerCase()) {
            case'darwin':
                return 'df -k';
                break;
            case'linux':
            default:
                return 'df';
        }
    },
    formatDrives: function(drives) {
        var map = {}, num = drives.length;

        for(var i=0; i < num; i++)
            map[drives[i].shift()] = this.formatDrive(drives[i]);

        return map;
    },
    formatDrive: function(drive) {
        var map;

        map = {
            used: numeral( drive[1] * 1024 ).format('0.00 b'),
            available: numeral( drive[2] * 1024 ).format('0.00 b'),
            percent: drive[3],
            mounted: drive[4] 
        };

        return map;
    },
    fetch: function(cb) {
        this.logger.info("Fetching", this.name);

        var self = this;

        var cmd = this.getCommand();

        this.logger.profile('Executing "' + cmd + '"');

        exec(cmd, function(err, out, code) {

                if(err)
                    self.logger.error(err);

                var drives = out.split('\n');

                drives.splice(0, 1);
                drives.splice(-1, 1);

                var num = drives.length;

                while(num--)
                    drives[num] = drives[num].split(/\s+/g);

                drives = _.reject(drives, function(v) { return v[0].indexOf('tmpfs') !== -1 || v[0] == 'rootfs'});
            
                self.attributes = self.formatDrives(drives);

                self.logger.profile('Executing "' + cmd + '"');

                return typeof cb === 'function' ? cb(err, self.attributes) : '';
        });
    }
}
