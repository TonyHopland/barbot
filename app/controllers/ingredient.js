// app/controllers/ingredients.js
 
var db = require('../../config/db.js');
 
 
/**
 * Find ingredient by id and store it in the request
 */
exports.ingredient = function(req, res, next, id) {
	db.Ingredient
		.find({ where: { id: id }/*, include: [ db.Pump ] */})
		.complete(function(err, ingredient) {
			if (!!err) {
				new Error('Failed to load Ingredient ' + id+': ' + err);
			} else if (!ingredient) {
				new Error('Failed to load Ingredient ' + id);
			} else {
				req.ingredient = ingredient;
				next();
			}
		});
}; 

/**
 * List of ingredients
 */
exports.query = function(req, res) {
	db.Ingredient.findAll({
		/*include: [ db.Pump ]*/
	}).success(function(ingredient) {
		res.json(ingredient);
	});
};
 
 
/**
 * Create a ingredient
 */
exports.create = function(req, res) {
	db.Ingredient
		.create(req.body)
			.complete(function(err, ingredient) {
				res.json(ingredient);
			});
};
 
/**
 * Update a ingredient
 */
exports.update = function(req, res) {

var ingredient = req.ingredient;
ingredient.name = req.body.name;
ingredient.color = req.body.color;

ingredient.save();
res.json(ingredient);
};
 
/**
 * Remove a ingredient
 */
exports.remove = function(req, res) {  
    db.Ingredient.destroy(
    {id: req.ingredient.id} /* where criteria */,
    {} /* options */
  );
};