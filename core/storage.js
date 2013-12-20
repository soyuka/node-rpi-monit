var redis = require("redis"), libs = require('../libs'), _ = require('underscore');

var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var replyToMap = function(keys, key, reply) {
	var map = {}, l = reply.length;

	keys = _.map(keys, function(k) { return k.replace(key + ':', '').split(':'); })

	if(keys[0].length == 1)

		for(var i = 0; i < l; i++)
			map[keys[i][0]] = reply[i];
		
	else
		
		for(var i = 0; i < l; i++) {
		
			if(typeof map[keys[i][0]] !== 'object')
				map[keys[i][0]] = {};

			map[ keys[i][0] ] [ keys[i][1] ] = reply[i];

		}
	
	return map;
}


client.getStats = function() {

	var args = _.toArray(arguments)
	  , cb = args[args.length - 1]
	  , things = [];

	args.pop();


	if( typeof args[0] === 'array' || typeof args[0] === 'object' ) {
		var counter = 0;

		for(var i in args[0]) {
			things[counter] = args[0][i];
			counter++;
		}
	}
	else
		things = args;


	var appendix = ':*';


	if(things.length == 1)
		appendix = ':*:*';

	var self = this, key = things.join(':'); 

	//Add timelapse instead of *
	self.keys(key + appendix, function(err, keys) {

		if(err) {
			global.logger.error("Error when fetching keys", err.toString());
			return cb("Error when fetching keys");
		}

		self.mget(keys, function(err, reply) {
				
			if(err) {
				global.logger.error("Error when fetching reply", err.toString());
				return cb("Error when fetching reply");
			} else
				return cb(err, replyToMap(keys, key, reply));
			
		});
	});

};

module.exports = client;