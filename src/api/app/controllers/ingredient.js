// app/controllers/ingredients.js

var db = require('../../config/db.js');


/**
 * Find ingredient by id and store it in the request
 */
exports.ingredient = function(req, res, next, id) {
	db.ingredient
		.find({ where: { id: id }/*, include: [ db.Pump ] */})
		.then(function(err, ingredient) {
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
	db.ingredient.findAll({
		attributes: ['id', 'name', 'color']
	}).then(function(ingredient) {
		res.json(ingredient);
	});
};


/**
 * Create a ingredient
 */
exports.create = function(req, res) {
	db.ingredient
		.create(req.body)
			.then(function(err, ingredient) {
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
ingredient.cl = req.body.cl;

ingredient.save();
res.json(ingredient);
};

exports.subtractCl = function(id, cl) {
	db.ingredient
		.find({ where: { id: id }/*, include: [ db.Pump ] */})
		.then(function(err, ingredient) {
			if (!!err) {
				new Error('Failed to load Ingredient ' + id+': ' + err);
			} else if (!ingredient) {
				new Error('Failed to load Ingredient ' + id);
			} else {
				ingredient.cl -= cl;
				ingredient.save();
			}
		});
}

/**
 * Remove a ingredient
 */
exports.remove = function(req, res) {
    db.ingredient.destroy(
    {id: req.ingredient.id} /* where criteria */,
    {} /* options */
  );
};
