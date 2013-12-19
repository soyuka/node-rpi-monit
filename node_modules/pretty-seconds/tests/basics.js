"use strict";

var   testCase = require('nodeunit').testCase
    , prettySeconds;

module.exports = testCase({

    'TC 1: stability tests': testCase({
        'loading prettySeconds function (require)': function(t) {
            prettySeconds = require('../pretty-seconds.js');

            t.ok(prettySeconds, 'prettySeconds is loaded.');
            t.done();
        },

        'run without parameters (null)': function(t) {
            var result = prettySeconds();

            t.strictEqual(result, '', 'prettySeconds did nothing');

            t.done();            
        },

        'run with zero seconds (0)': function(t) {
            var result = prettySeconds(0);

            t.strictEqual(result, '', 'prettySeconds did nothing');

            t.done();
        },

        'run with invalid parameters': function(t) {
            var result = prettySeconds('booom');
            t.strictEqual(result, '', 'prettySeconds can cope with bad string parameters');

            result = prettySeconds(['booom']);
            t.strictEqual(result, '', 'prettySeconds can cope with bad array parameters');

            result = prettySeconds({boom: 'booom'});
            t.strictEqual(result, '', 'prettySeconds can cope with bad objects');

            t.done();
        }
    }),

    'TC 2: real tests': testCase({
        'run with negative seconds': function(t) {
            var result = prettySeconds(-10);

            t.strictEqual(result, "-10 seconds", 'prettySeconds managed with negative seconds');

            t.done();
        },

        'one second': function(t) {
            var result = prettySeconds(1);

            t.strictEqual(result, "1 second", 'prettySeconds managed with one second');

            t.done();
        },

        'two seconds': function(t) {
            var result = prettySeconds(2);

            t.strictEqual(result, "2 seconds", 'prettySeconds managed with two seconds');

            t.done();
        },

        'various tests under 10 minutes': function(t) {
            var result = prettySeconds(59);
            t.strictEqual(result, "59 seconds");

            result = prettySeconds(60);
            t.strictEqual(result, "1 minute");

            result = prettySeconds(61);
            t.strictEqual(result, "1 minute and 1 second");

            result = prettySeconds(62);
            t.strictEqual(result, "1 minute and 2 seconds");

            result = prettySeconds(120);
            t.strictEqual(result, "2 minutes");

            result = prettySeconds(121);
            t.strictEqual(result, "2 minutes and 1 second");

            t.done();
        },

        'various test under 2 hours': function(t) {
            var result = prettySeconds(3599);
            t.strictEqual(result, "59 minutes and 59 seconds");
            
            result = prettySeconds(3600);
            t.strictEqual(result, "1 hour");

            result = prettySeconds(3601);
            t.strictEqual(result, "1 hour and 1 second");

            result = prettySeconds(3602);
            t.strictEqual(result, "1 hour and 2 seconds");

            result = prettySeconds(3660);
            t.strictEqual(result, "1 hour and 1 minute");

            result = prettySeconds(3662);
            t.strictEqual(result, "1 hour, 1 minute and 2 seconds");

            t.done();
        },

        'various test under 5 days': function(t) {
            var result = prettySeconds(86399);
            t.strictEqual(result, "23 hours, 59 minutes and 59 seconds");

            result = prettySeconds(86400);
            t.strictEqual(result, "1 day");

            result = prettySeconds(86465);
            t.strictEqual(result, "1 day, 1 minute and 5 seconds");

            result = prettySeconds(259200);
            t.strictEqual(result, "3 days");

            result = prettySeconds(266400);
            t.strictEqual(result, "3 days and 2 hours");

            result = prettySeconds(266460);
            t.strictEqual(result, "3 days, 2 hours and 1 minute");

            result = prettySeconds(266467);
            t.strictEqual(result, "3 days, 2 hours, 1 minute and 7 seconds");

            t.done();
        }
    })
});
