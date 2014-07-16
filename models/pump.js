var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

PumpSchema = new mongoose.Schema({
	id: Number,
	tubeLength: Number,
	ingredient : { type : mongoose.Schema.ObjectId, ref : 'Ingredient' }
});

module.exports = mongoose.model('Pump', PumpSchema);