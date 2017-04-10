module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    cl: DataTypes.DECIMAL
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Ingredient.belongsTo(models.Pump);
      }
    }
  });

  return Ingredient;
};
