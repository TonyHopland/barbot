module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    cl: DataTypes.DECIMAL
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Ingredient.belongsTo(models.pump);
      }
    }
  });

  return Ingredient;
};
