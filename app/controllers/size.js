// app/controllers/size.js
 
var db = require('../../config/db.js');
 
 
/**
 * Find size by id and store it in the request
 */
 
exports.size = function(req, res, next, id) {
	db.Size
		.find({ where: { id: id } })
		.complete(function(err, size) {
			if (!!err) {
				new Error('Failed to load size ' + id+': ' + err);
			} else if (!size) {
				new Error('Failed to load size ' + id);
			} else {
				req.size = size;
				next();
			}
		})
};

/**
 * List of sizes
 */
exports.query = function(req, res) {
	  db.Size.findAll().success(function(size) {
			res.json(size);
	  })
};
 
 
/**
 * Create a size
 */
exports.create = function(req, res) {
	req.body.id = req.body.newId;
	delete req.body.newId;
	db.Size
		.create(req.body)
			.complete(function(err, size) {
				res.json(size);
			})
 
};
 
/**
 * Update a size
 */
exports.update = function(req, res) {

var size = req.size;
size.name = req.body.name;
size.cl = req.body.cl;

size.save();
res.json(size);
};
 
/**
 * Remove a size
 */
exports.remove = function(req, res) {
   db.Size.destroy(
    {id: req.size.id} /* where criteria */,
    {} /* options */
  );
};