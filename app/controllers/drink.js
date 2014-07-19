// app/controllers/recipe.js
 
var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');
  Recipepart = mongoose.model('Recipepart');
  Ingredient = mongoose.model('Ingredient');
  Pump = mongoose.model('Pump');
 
 
/**
 * Find recipe by id and store it in the request
 */
exports.drink = function(req, res, next, id) {
  Recipe.findById(id).exec(function(err, recipe) {
    if (err) return next(err);
    if (!recipe) return next(new Error('Failed to load recipe ' + id));
    req.recipe = recipe;
    next();
  });
};

/**
 * List of recipes
 */
exports.query = function(req, res) {

	Recipe.find().exec(function(err, recipes) {
		if (err) return res.json(500, err);
		Recipepart.populate(recipes,
			{path:"recipe",sort: { 'order': -1 }},
			function(err, recipes) {
			if (err) return res.json(500, err);
			Ingredient.populate(recipes,
				{path:"recipe.ingredient"},
				function(err, recipes) {
					if (err) return res.json(500, err);
					Pump.populate(recipes,
						{path:"recipe.ingredient.pump",
						select: "id"},
						function(err, recipes) {
							if (err) return res.json(500, err);
							res.json(recipes);
						});
			});
		});
	});

};
