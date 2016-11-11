// app/controllers/pump.js
 
var db = require('../../config/db.js');
 
 
/**
 * Find pump by id and store it in the request
 */
 
exports.pump = function(req, res, next, id) {
	db.Pump
		.find({ where: { id: id },include    : { model: db.Ingredient, attributes: ['id']}})
		.then(function(err, pump) {
			if (!!err) {
				new Error('Failed to load pump ' + id+': ' + err);
			} else if (!pump) {
				new Error('Failed to load pump ' + id);
			} else {
				req.pump = pump;
				next();
			}
		})
};

/**
 * List of pumps
 */
exports.query = function(req, res) {
	  db.Pump.findAll({
			include    : { model: db.Ingredient, attributes: ['id']}
	  }).then(function(pump) {
			res.json(pump);
	  })
};
 
 
/**
 * Create a pump
 */
exports.create = function(req, res) {
	req.body.id = req.body.newId;
	delete req.body.newId;
	db.Pump
		.create(req.body)
			.then(function(err, pump) {
				res.json(pump);
			})
 
};
 
/**
 * Update a pump
 */
exports.update = function(req, res) {

var pump = req.pump;
pump.tubelength = req.body.tubelength;
pump.msPerCl = req.body.msPerCl;
if(req.body.ingredient){
	db.Ingredient
			.find({ where: { id: req.body.ingredient.id }})
			.then(function(err, ingredient) {
				if (!!err) {
					new Error('Failed to load ingredient ' + id+': ' + err);
				} else if (!ingredient) {
					new Error('Failed to load ingredient ' + id);
				} else {
					pump.setIngredient(ingredient);
				}
			})
}
pump.save();
res.json(pump);

};
 
/**
 * Remove a pump
 */
exports.remove = function(req, res) {
console.log(res.pump);
   db.Pump.destroy(
    {id: req.pump.id} /* where criteria */,
    {} /* options */
  );
};