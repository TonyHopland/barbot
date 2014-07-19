var mongoose = require('mongoose');
var cascadingRelations = require('cascading-relations');
var Schema   = mongoose.Schema;

var IngredientSchema = new Schema({
	name: String,
	color: String,
	pump : { type : mongoose.Schema.ObjectId, ref : 'Pump' }
});

IngredientSchema.plugin(cascadingRelations);

module.exports = mongoose.model('Ingredient', IngredientSchema);