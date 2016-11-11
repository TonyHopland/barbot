module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
  	name: 		DataTypes.STRING,
	maxsize: 	DataTypes.INTEGER,
	image:		DataTypes.STRING,
	notes:		DataTypes.TEXT,
	missingIngredients: {
        type     : DataTypes.INTEGER,
        allowNull: true,
        get      : function()  {
            var missingIngredients = 0;
            for(var r in this.Recipeparts){
                if (!this.Recipeparts[r].Ingredient || !this.Recipeparts[r].Ingredient.PumpId){
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
  });
 
  return Recipe
};