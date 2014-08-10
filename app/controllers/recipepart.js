// app/controllers/recipepart.js
 
var db = require('../../config/db.js');
 
 
/**
 * Find recipepart by id and store it in the request
 */
exports.recipepart = function(req, res, next, id) {
	db.Recipepart
		.find({ where: { id: id }, include: [ db.Ingredient ] })
		.complete(function(err, recipepart) {
			if (!!err) {
				new Error('Failed to load recipepart ' + id+': ' + err);
			} else if (!recipepart) {
				new Error('Failed to load recipepart ' + id);
			} else {
				req.recipepart = recipepart;
				next();
			}
		});
}; 

/**
 * List of recipepart
 */
exports.query = function(req, res) {
	db.Recipepart.findAll({
		include: [ db.Ingredient ]
	}).success(function(recipepart) {
		res.json(recipepart);
	});
};
 
 
/**
 * Create a recipepart
 */
exports.create = function(req, res) {
	db.Recipepart
		.create(req.body)
			.complete(function(err, recipepart) {
				db.Recipe
				.find({ where: { id: req.body.recipe }})
				.complete(function(err, recipe) {
					if (!!err) {
						new Error('Failed to load ingredient ' + id+': ' + err);
					} else if (!recipe) {
						new Error('Failed to load ingredient ' + id);
					} else {
						recipepart.setRecipe(recipe);
						res.json(recipepart);
					}
				})
				
			});
};
 
/**
 * Update a recipepart
 */
exports.update = function(req, res) {

	var recipepart = req.recipepart;
	recipepart.amount = req.body.amount;
	recipepart.order = req.body.order;
	recipepart.startdelay = req.body.startdelay;
	recipepart.IngredientId = req.body.IngredientId;

	recipepart.save().complete(function(err, rp) {
		db.Recipepart
			.find({ where: { id: rp.id }, include: [ db.Ingredient ] })
			.complete(function(err, recipepart) {
				if (!!err) {
					new Error('Failed to load recipepart ' + id+': ' + err);
				} else if (!recipepart) {
					new Error('Failed to load recipepart ' + id);
				} else {
					res.json(recipepart)
				}
			});
	});


};
 
/**
 * Remove a ingredient
 */
exports.remove = function(req, res) {  
    db.Recipepart.destroy(
    {id: req.recipepart.id} /* where criteria */,
    {} /* options */
  );
};