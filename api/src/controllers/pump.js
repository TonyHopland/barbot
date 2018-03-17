import dbProxy from '../proxies/dbProxy';

export const getPumpById = (req, res) =>
	dbProxy.getPumpById(req.params.id)
		.then(pump => res.json(pump));

export const getAllPumps = (req, res) =>
	dbProxy.getAllPumps()
		.then(pump => res.json(pump));

export const createPump = (req, res) => {
	var newPump = req.body;
	// Todo: Validate newPump

	dbProxy.createPump(newPump)
		.then(pump => res.json(pump));
}
	

/**
 * Create a pump
 */
// exports.create = function(req, res) {
// 	req.body.id = req.body.newId;
// 	delete req.body.newId;
// 	db.pump
// 		.create(req.body)
// 			.then(function(err, pump) {
// 				res.json(pump);
// 			})

// };

// /**
//  * Update a pump
//  */
// exports.update = function(req, res) {

// var pump = req.pump;
// pump.tubelength = req.body.tubelength;
// pump.msPerCl = req.body.msPerCl;
// if(req.body.ingredient){
// 	db.ingredient
// 			.find({ where: { id: req.body.ingredient.id }})
// 			.then(function(err, ingredient) {
// 				if (!!err) {
// 					new Error('Failed to load ingredient ' + id+': ' + err);
// 				} else if (!ingredient) {
// 					new Error('Failed to load ingredient ' + id);
// 				} else {
// 					pump.setIngredient(ingredient);
// 				}
// 			})
// }
// pump.save();
// res.json(pump);

// };

// /**
//  * Remove a pump
//  */
// exports.remove = function(req, res) {
// console.log(res.pump);
//    db.pump.destroy(
//     {id: req.pump.id} /* where criteria */,
//     {} /* options */
//   );
// };
