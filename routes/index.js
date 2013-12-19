module.exports = function(app, librairies){
	app.get('/', function(req, res) {
		res.render('index', {libs: librairies});
	});
};