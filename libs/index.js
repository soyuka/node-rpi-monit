var fs = require('fs')
  , _ = require('underscore')
  , async = require('async')
  , path = require('path');

var storage = require('../core/storage');

var config = require('../config');

var libs = {
	librairies: [],
	require: function(lib) {
		var p = path.join(__dirname, lib);
		
		this.librairies.push(
			_.extend({}, require('../core/lib'), require(p), config.libs[path.basename(lib, '.js')])
		);

		return this;
	},
	handler: function(event, datas, time) {
		var key = this.name.toLowerCase() + ':' + event + ':' + time;

		if(typeof datas === 'object')
			datas =  JSON.stringify(datas);

		storage.SETEX(key, 3600, datas);
	},
	registerEvents: function(lib) {
		var self = this;

		_.each(lib.events, function(evt) {

			lib.addListener(evt, function() {
				
				var args = [evt];
				Array.prototype.push.apply( args, arguments );

				self.handler.apply(this, args);
			});
		});

	},
	initAll: function(cb) {
		var self = this;

		async.each(this.librairies, function(lib, cb) {
			self.registerEvents(lib);
			lib.init(cb);
		}, function(err) {
			cb(err, self);
		});
	},
	init: function(lib, cb) {
		
		cb = typeof lib === 'function' ? lib : cb;

		if(typeof lib === 'string')

			this.require(lib);
		
        else {
			var libs = fs.readdirSync(__dirname);

			libs = _.reject(libs, function(val){ return val === 'index.js'; });

			for(var i in libs)
				this.require(libs[i]);
		}


		this.initAll(cb);
	},
	get: function(lib) {
		var self = this;

		return lib ? _.filter(self.librairies, function(v) { return v.name.toLowerCase() == lib.toLowerCase(); })[0] : this.librairies;
	},
	getAttributes: function(lib) {
		if(lib)
			return this.librairies[lib].attributes;
		else {
			var libs = {}, num = this.librairies.length;

			while(num--) {
				var l = this.librairies[num];

				libs[l.name] = l.attributes;
			}

			return libs;
		}
	}
}

module.exports = libs;