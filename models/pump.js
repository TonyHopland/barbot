module.exports = function(sequelize, DataTypes) {
  var Pump = sequelize.define('Pump', {
	id: DataTypes.INTEGER,
    tubelength: DataTypes.DECIMAL
  }, {
	timestamps: false,
    classMethods: {
      associate: function(models) {
        Pump.hasOne(models.Ingredient);
      }
    }
  })
 
  return Pump
};