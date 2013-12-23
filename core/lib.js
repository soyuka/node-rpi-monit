var _ = require('underscore'), storage = require('./storage');

var lib = {
	init: function(cb) {
		var self = this;

		if(!this.interval) {

			if(this.update > 0 && this.autoStart)
				this.interval = setInterval(function() {
					self.fetch();
				}, self.update);

			this.fetch(cb);
		}
	},
	autoStart: true,
	start: function() {
		var self = this;

		this.interval = setInterval(function() {
			self.fetch();
		}, self.update);
	},
	stop: function() {
		self.interval.clearInterval();
	},
	sort: function(obj, stats) {
		return stats;
	},
	getStats: function(obj, cb) {
		var self = this;

		if(this.update > 0) {

			if(typeof obj === 'function') {
				cb = obj;
				obj = this.name;
			}

			storage.getStats(obj, function(err, stats) {
				cb(err, self.sort(obj, stats));
			});

		} else {
			global.logger.error("The librairy " + this.name + " has no stats");
			cb("The librairy " + this.name + " has no stats");
		}
	},
	events: [],
	attributes: {},
	logger: global.logger,
	update: -1,
	name: 'Unknown',
	interval: null,
	fetch: function() {}
};

var events = require('events'), util = require('util');

var Eventer = function() {
	events.EventEmitter.call(this);

	_.extend(this, lib);
}

util.inherits(Eventer, events.EventEmitter);

module.exports = new Eventer();
