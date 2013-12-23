
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var winston = require('winston');
var app = express();

var _ = require('underscore');

var config = require('./config');

var loggerConfiguration = _.extend({
                    colorize: true, 
                    levels: _.extend(winston.config.syslog.levels, {debug:7}), 
                    level: 'debug'
                }, config.logger);

//Global logger, could be extended
global.logger = new (winston.Logger)(
	{
		transports: [
    		new (winston.transports.Console)(
    			loggerConfiguration
    		)
    		//      new (winston.transports.File)({ filename: 'somefile.log' })
    	]
	}
);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var libs = require('./libs');

libs.init(function(err) {
	
	require('./routes')(app);

	http.createServer(app).listen(app.get('port'), function(){
	  	global.logger.info('Express server listening on port ' + app.get('port'));
	});
	
});
