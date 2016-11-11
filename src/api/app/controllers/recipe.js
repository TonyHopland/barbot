// app/controllers/Recipe.js

var db = require('../../config/db.js');


/**
 * Find recipe by id and store it in the request
 */
exports.recipeId = function(req, res, next, id) {
	db.Recipe.find({
		where: { id: id },
		include: [{ model: db.Recipepart, include: [db.Ingredient] }],
		order: [ [ db.Recipepart, 'order' ] ] })
		.then(function(recipe) {
			if (!recipe) {
				new Error('Failed to load recipe ' + id);
			} else {
				req.recipe = recipe;
				next();
			}
		},function(err) {
				new Error('Failed to load recipe ' + id+': ' + err);
		});
};

exports.recipe = function(req, res) {
	res.json(req.recipe);
};

/**
 * List of recipes
 */
exports.query = function(req, res) {
	db.Recipe.findAll({
			include: [{ model: db.Recipepart, include: [db.Ingredient] }]
	})
		.then(function(recipe) {
		res.json(recipe);
	});
};


/**
 * Create a recipe
 */
exports.create = function(req, res) {
	db.Recipe
		.create(req.body)
			.then(function(err, recipe) {
				res.json(recipe);
			});
};

/**
 * Update a recipe
 */
exports.update = function(req, res) {

var recipe = req.recipe;
recipe.name = req.body.name;
recipe.maxsize = req.body.maxsize;
recipe.image = req.body.image;
recipe.notes = req.body.notes;

if(req.body.recipepart){
	for(part in req.body.recipepart){
		db.Recipepart
			.find({ where: { id: req.body.recipepart[part].id }})
			.then(function(err, recipepart) {
				if (!!err) {
					new Error('Failed to load recipepart ' + id+': ' + err);
				} else if (!recipepart) {
					new Error('Failed to load recipepart ' + id);
				} else {
					recipe.setRecipepart(recipepart);
				}
			})
	}
}

recipe.save();
res.json(recipe);

};

/**
 * Remove a recipe
 */
exports.remove = function(req, res) {
    db.Recipe.destroy(
		{id: req.recipe.id} /* where criteria */,
		{} /* options */
	);
	db.Recipepart.destroy(
		{RecipeId: req.recipe.id} /* where criteria */,
		{} /* options */
	);
};