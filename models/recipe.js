var mongoose = require('mongoose');
var cascadingRelations = require('cascading-relations');
var Schema   = mongoose.Schema;

RecipeSchema = new mongoose.Schema({
	name: 		String,
	maxsize: 	Number,
	image:		String,
	recipe: 	[{ 
					type : mongoose.Schema.ObjectId, 
					ref : 'Recipepart',
					$cascadeDelete : true
				}]
});

RecipeSchema.plugin(cascadingRelations);

module.exports = mongoose.model('Recipe', RecipeSchema);