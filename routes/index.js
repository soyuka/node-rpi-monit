/*
 * GET home page.
 */

var routes = {
	index : function(req, res) {



		res.render('index', {libs : {}});


	}
}

module.exports = function(app){
	app.get('/', routes.index);
};