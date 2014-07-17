var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

RecipeSchema = new mongoose.Schema({
	name: 		String,
	maxsize: 	Number,
	image:		String,
	recipe: 	[{ type : mongoose.Schema.ObjectId, ref : 'Recipepart' }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);