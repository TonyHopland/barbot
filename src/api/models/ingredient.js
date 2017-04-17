module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    cl: DataTypes.DECIMAL
  }, {
    timestamps: false,
  });

  return Ingredient;
};
