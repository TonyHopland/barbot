var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

RecipepartSchema = new mongoose.Schema({
	amount:		Number,
	order:	 	Number,
	startdelay: Number,
	ingredient:	{ type : mongoose.Schema.ObjectId, ref : 'Ingredient' }
});

module.exports = mongoose.model('Recipepart', RecipepartSchema);