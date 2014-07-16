var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

PumpSchema = new mongoose.Schema({
	id: Number,
	ingredient : [{ type : mongoose.Schema.ObjectId, ref : 'ingredient' }]
});

module.exports = mongoose.model('Pump', PumpSchema);