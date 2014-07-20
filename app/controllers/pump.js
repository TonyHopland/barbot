// app/controllers/pump.js
 
var mongoose = require('mongoose'),
  Pump = mongoose.model('Pump');
  Ingredient = mongoose.model('Ingredient');
 
 
/**
 * Find pump by id and store it in the request
 */
exports.pump = function(req, res, next, id) {
  Pump.findById(id).populate('ingredient').exec(function(err, pump) {
    if (err) return next(err);
    if (!pump) return next(new Error('Failed to load pump ' + id));
    req.pump = pump;
    next();
  });
};

/**
 * List of pumps
 */
exports.query = function(req, res) {
  Pump.find().populate('ingredient').sort('id').exec(function(err, pumps) {
    if (err) return res.json(500, err);
    res.json(pumps);
  });
};
 
 
/**
 * Create a pump
 */
exports.create = function(req, res) {
  var pump = new Pump(req.body);
 
  pump.save(function(err) {
    if (err) return res.json(500, err);
    res.json(pump);
  });
};
 
/**
 * Update a pump
 */
exports.update = function(req, res) {
  delete req.body._id;
  Pump.update({ _id: req.pump._id }, req.body, { upsert: true}, function(err, updatedPump) {
    if (err) return res.json(500, err);
	Ingredient.update({pump: req.pump._id}, { $set : { pump: null }}, function(err, updateding) {
		if (err) return res.json(500, err);
		Ingredient.update({_id: req.body.ingredient}, { $set : { pump: req.pump._id }}, function(err, updateding) {
			if (err) return res.json(500, err);
		});
	});
	res.json(updatedPump);
  });
};
 
/**
 * Remove a pump
 */
exports.remove = function(req, res) {
  var pump = req.pump;
 
  pump.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(pump);   
  });
};