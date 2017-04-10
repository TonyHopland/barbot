module.exports = function(sequelize, DataTypes) {
  var Recipepart = sequelize.define('Recipepart', {
    amount:		DataTypes.DECIMAL,
    order:	 	DataTypes.INTEGER,
    startdelay: DataTypes.INTEGER,
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Recipepart.belongsTo(models.Recipe);
        Recipepart.belongsTo(models.Ingredient);
      }
    }
  });

  return Recipepart;
};
