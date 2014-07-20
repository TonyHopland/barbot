// app/controllers/recipe.js
 
var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe');
 
 
/**
 * Find recipe by id and store it in the request
 */
exports.recipe = function(req, res, next, id) {
  Recipe.findById(id).populate('recipe').exec(function(err, recipe) {
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
  Recipe.find().populate('recipe').exec(function(err, recipes) {
    if (err) return res.json(500, err);
    res.json(recipes);
  });
};
 
 
/**
 * Create a recipe
 */
exports.create = function(req, res) {
  var recipe = new Recipe(req.body);
 
  recipe.save(function(err) {
    if (err) return res.json(500, err);
    res.json(recipe);
  });
};
 
/**
 * Update a recipe
 */
exports.update = function(req, res) {
  delete req.body._id;
  Recipe.update({ _id: req.recipe._id }, req.body, { }, function(err, updatedRecipe) {
    if (err) return res.json(500, err);
    res.json(updatedRecipe);
  });
};
 
/**
 * Remove a recipe
 */
exports.remove = function(req, res) {
  var recipe = req.recipe;
 
  recipe.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(recipe);   
  });
};