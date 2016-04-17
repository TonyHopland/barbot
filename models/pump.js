module.exports = function(sequelize, DataTypes) {
  var Pump = sequelize.define('Pump', {
	id: { type: DataTypes.INTEGER, primaryKey: true },
	msPerCl: DataTypes.INTEGER,
    tubelength: DataTypes.DECIMAL
  }, {
	timestamps: false,
    classMethods: {
      associate: function(models) {
        Pump.hasOne(models.Ingredient);
      }
    }
  });
 
  return Pump
};