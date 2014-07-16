 // app/routes.js

	module.exports = function(app) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes


		// route to handle creating (app.post)
		// route to handle delete (app.delete)

		var ingredients = require('./controllers/ingredient');
		
		app.param('ingredientId', ingredients.ingredient);
		
		app.get('/api/ingredients', ingredients.query);
		app.post('/api/ingredients', ingredients.create);
		app.put('/api/ingredients/:ingredientId', ingredients.update);
		app.delete('/api/ingredients/:ingredientId', ingredients.remove);
		
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/index.html'); // load our public/index.html file
		});

	};


