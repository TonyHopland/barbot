// app/controllers/recipepart.js
 
var mongoose = require('mongoose'),
  Recipepart = mongoose.model('Recipepart');
 
 
/**
 * Find recipepart by id and store it in the request
 */
exports.recipepart = function(req, res, next, id) {
  Recipepart.findById(id).populate('ingredient').exec(function(err, recipepart) {
    if (err) return next(err);
    if (!recipepart) return next(new Error('Failed to load recipepart ' + id));
    req.recipepart = recipepart;
    next();
  });
};

/**
 * List of recipepart
 */
exports.query = function(req, res) {
  Recipepart.find().populate('ingredient').exec(function(err, recipeparts) {
    if (err) return res.json(500, err);
    res.json(recipeparts);
  });
};
 
 
/**
 * Create a recipepart
 */
exports.create = function(req, res) {
  var recipepart = new Recipepart(req.body);
 
  recipepart.save(function(err) {
    if (err) return res.json(500, err);
    res.json(recipepart);
  });
};
 
/**
 * Update a recipepart
 */
exports.update = function(req, res) {
var ingredient = req.body.ingredient;
req.body.ingredient = ingredient._id; //We send full object but can only save id back to db
  Recipepart.update({ _id: req.recipepart._id }, req.body, { }, function(err, updatedRecipepart) {
    if (err) return res.json(500, err);
	updatedrecipepart.ingredient = ingredient;
    res.json(updatedRecipepart);
  });
};
 
/**
 * Remove a recipepart
 */
exports.remove = function(req, res) {
  var recipepart = req.recipepart;
 
  recipepart.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(recipepart);   
  });
};