module.exports = function(sequelize, DataTypes) {
  var Pump = sequelize.define('pump', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    msPerCl: DataTypes.INTEGER,
    tubelength: DataTypes.DECIMAL
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Pump.belongsTo(models.ingredient);
      }
    }
  });

  return Pump
};
