module.exports = function(sequelize, DataTypes) {
  var Recipepart = sequelize.define('recipepart', {
    amount:		DataTypes.DECIMAL,
    order:	 	DataTypes.INTEGER,
    startdelay: DataTypes.INTEGER,
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Recipepart.belongsTo(models.recipe);
        Recipepart.belongsTo(models.ingredient);
      }
    }
  });

  return Recipepart;
};
