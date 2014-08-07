module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
  	name: 		DataTypes.STRING,
	maxsize: 	DataTypes.INTEGER,
	image:		DataTypes.STRING,
	notes:		DataTypes.TEXT,
	missingIngredients: {
    type     : DataTypes.INTEGER,
    allowNull: true,
    get      : function()  {
        var missingIngredients = 0;
		for(var r in this.recipeparts){
			if (this.recipeparts[r].ingredient.PumpId == null){
				missingIngredients++;
			}
		}
		return missingIngredients;
    }
  }
  }, {
	timestamps: false,
    classMethods: {
      associate: function(models) {
		Recipe.hasMany(models.Recipepart);
      }
    }
  })
 
  return Recipe
};