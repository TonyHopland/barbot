var mongoose = require('mongoose');
var cascadingRelations = require('cascading-relations');
var Schema   = mongoose.Schema;

RecipepartSchema = new mongoose.Schema({
	amount:		Number,
	order:	 	Number,
	startdelay: Number,
	ingredient:	{ type : mongoose.Schema.ObjectId, ref : 'Ingredient', $cascadeDelete : false }
});

RecipepartSchema.plugin(cascadingRelations);

module.exports = mongoose.model('Recipepart', RecipepartSchema);