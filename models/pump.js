var mongoose = require('mongoose');
var cascadingRelations = require('cascading-relations');
var Schema   = mongoose.Schema;

PumpSchema = new mongoose.Schema({
	id: Number,
	tubeLength: Number,
	ingredient : { type : mongoose.Schema.ObjectId, ref : 'Ingredient' }
});

PumpSchema.plugin(cascadingRelations);

module.exports = mongoose.model('Pump', PumpSchema);