// app/controllers/ingredients.js
 
var mongoose = require('mongoose'),
  Ingredient = mongoose.model('Ingredient');
 
 
/**
 * Find ingredient by id and store it in the request
 */
exports.ingredient = function(req, res, next, id) {
  console.log("[Mongoose] Requested ingredient by ID");
  Ingredient.findById(id, function(err, ingredient) {
    if (err) return next(err);
    if (!ingredient) return next(new Error('Failed to load ingredient ' + id));
	Category.find({account: this}, done);
    req.ingredient = ingredient;
    next();
  });
}; 

/**
 * List of ingredients
 */
exports.query = function(req, res) {
  console.log("[Mongoose] Requested ingredient list");
  Ingredient.find(function(err, ingredients) {
    if (err) return res.json(500, err);
    res.json(ingredients);
  });
};
 
 
/**
 * Create a ingredient
 */
exports.create = function(req, res) {
  console.log("[Mongoose] Created ingredient");
  var ingredient = new Ingredient(req.body);
 
  ingredient.save(function(err) {
    if (err) return res.json(500, err);
    res.json(ingredient);
  });
};
 
/**
 * Update a ingredient
 */
exports.update = function(req, res) {
  console.log("[Mongoose] Updated ingredient");
  Ingredient.update({ _id: req.ingredient._id }, req.body, { }, function(err, updatedIngredient) {
    if (err) return res.json(500, err);
    res.json(updatedIngredient);
  });
};
 
/**
 * Remove a ingredient
 */
exports.remove = function(req, res) {
  console.log("[Mongoose] Removed ingredient");
  var ingredient = req.ingredient;
 
  ingredient.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(ingredient);   
  });
};