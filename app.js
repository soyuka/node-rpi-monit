
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var winston = require('winston');
var app = express();

//Global logger, could be extended
global.logger = new (winston.Logger)(
	{
		transports: [
    		new (winston.transports.Console)({colorize: true})
    		//      new (winston.transports.File)({ filename: 'somefile.log' })
    	]
	}
);

// global.logger.addColors(
// 	{
// 		info: ''
// 	}
// );


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

require('./routes')(app);

var libs = require('./libs').init(function(err, librairies) {
	console.log(librairies);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
