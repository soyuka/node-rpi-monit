/**
 * Fork from https://bitbucket.org/pinchprojectbackend/node-diskfree/ I added used percentages
 * License
 * The MIT License (MIT)
 * Copyright (c) 2013 PinchProject
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var exec = require('child_process').exec,
    os = require('os');

var async = require('async'),
    numeral = require('numeral');

/**
 * Retrieve disks list.
 *
 * @param callback
 */
exports.drives = function (callback) {
    switch (os.platform().toLowerCase()) {
        case'darwin':
            getDrives('df -k | awk \'{print $1}\'', callback);
            break;
        case'linux':
        default:
            getDrives('df | awk \'{print $1}\'', callback);
    }
};

/**
 * Execute a command to retrieve disks list.
 *
 * @param command
 * @param callback
 */
function getDrives(command, callback) {
    var child = exec(
        command,
        function (err, stdout, stderr) {
            if (err) return callback(err);

            var drives = stdout.split('\n');

            drives.splice(0, 1);
            drives.splice(-1, 1);

            callback(null, drives);
        }
    );
}

/**
 * Retrieve space information about one drive.
 *
 * @param drive
 * @param callback
 */
exports.driveDetail = function (drive, callback) {
    detail(drive, callback);
};

/**
 * Retrieve space information about each drives.
 *
 * @param drives
 * @param callback
 */
exports.drivesDetail = function (drives, callback) {
    var drivesDetail = [];

    async.eachSeries(
        drives,
        function (drive, cb) {
            detail(
                drive,
                function (err, detail) {
                    if (err) return cb(err);
                    drivesDetail.push(detail);
                    cb();
                }
            );
        },
        function (err) {
            if (err) return callback(err);
            callback(null, drivesDetail);
        }
    );
};

/**
 * Retrieve space information about one drive.
 * Maybe that using the same command, store + read within JS is more powerfull
 * @param drive
 * @param callback
 */
function detail(drive, callback) {
    async.series(
        {
            used: function (callback) {
                switch (os.platform().toLowerCase()) {
                    case'darwin':
                        getDetail('df -k | grep ' + drive + ' | awk \'{print $3}\'', callback);
                        break;
                    case'linux':
                    default:
                        getDetail('df | grep ' + drive + ' | awk \'{print $3}\'', callback);
                }
            },
            available: function (callback) {
                switch (os.platform().toLowerCase()) {
                    case'darwin':
                        getDetail('df -k | grep ' + drive + ' | awk \'{print $4}\'', callback);
                        break;
                    case'linux':
                    default:
                        getDetail('df | grep ' + drive + ' | awk \'{print $4}\'', callback);
                }
            }
        },
        function (err, results) {
            if (err) return callback(err);

            var total = results.used + results.available;

            results.total = numeral(total).format('0.00 b');

            //Mod
            results.percent = numeral( (results.used / total) ).format('0.00 %');

            results.used = numeral(results.used).format('0.00 b');
            results.available = numeral(results.available).format('0.00 b');
            results.drive = drive;

            callback(null, results);
        }
    );
}

/**
 * Execute a command.
 *
 * @param command
 * @param callback
 */
function getDetail(command, callback) {
    var child = exec(
        command,
        function (err, stdout, stderr) {
            if (err) return callback(err);
            callback(null, parseInt(stdout) * 1024);
        }
    );
}