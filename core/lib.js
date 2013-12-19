
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

module.exports = lib;
