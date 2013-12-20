var _ = require('underscore');

var lib = {
	init: function(cb) {
		var self = this;

		if(!this.interval) {

			if(this.update > 0)
				this.interval = setInterval(function() {
					self.fetch();
				}, self.update);

			this.fetch(cb);
		}
	},
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
