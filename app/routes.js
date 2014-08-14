 // app/routes.js
var path = require('path')
	module.exports = function(app) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes


		//Prevent IE from caching stuffs
		app.use(function noCache(req, res, next){
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");
			res.header("Expires",0);
			next();
		});

		var ingredients = require('./controllers/ingredient');
		app.param('ingredientId', ingredients.ingredient);
		app.get('/api/ingredients', ingredients.query);
		app.post('/api/ingredients', ingredients.create);
		app.put('/api/ingredients/:ingredientId', ingredients.update);
		app.delete('/api/ingredients/:ingredientId', ingredients.remove);
	
		var pumps = require('./controllers/pump');
		app.param('pumpId', pumps.pump);
		app.get('/api/pumps', pumps.query);
		app.post('/api/pumps', pumps.create);
		app.put('/api/pumps/:pumpId', pumps.update);
		app.delete('/api/pumps/:pumpId', pumps.remove);
		
		var recipes = require('./controllers/recipe');
		app.param('recipeId', recipes.recipe);
		app.get('/api/recipes', recipes.query);
		app.post('/api/recipes', recipes.create);
		app.put('/api/recipes/:recipeId', recipes.update);
		app.delete('/api/recipes/:recipeId', recipes.remove);
		
		var recipeparts = require('./controllers/recipepart');
		app.param('recipepartId', recipeparts.recipepart);
		app.get('/api/recipeparts', recipeparts.query);
		app.post('/api/recipeparts', recipeparts.create);
		app.put('/api/recipeparts/:recipepartId', recipeparts.update);
		app.delete('/api/recipeparts/:recipepartId', recipeparts.remove);
		/*
		var drink = require('./controllers/drink');
		app.param('drinkId', drink.drink);
		app.get('/api/drinks', drink.query);
		*/
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			
			res.sendfile(path.resolve(__dirname,'../public/index.html')); // load our public/index.html file
		});

	};


