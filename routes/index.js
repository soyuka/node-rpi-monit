/*
 * GET home page.
 */

var routes = {
	index : function(req, res) {
		require('../libs')(function(err, libs) {
			res.render('index', {libs : libs});
		});
	}
}

module.exports = function(app){
	app.get('/', routes.index);
};