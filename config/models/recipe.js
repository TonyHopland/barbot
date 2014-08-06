module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
  	name: 		DataTypes.STRING,
	maxsize: 	DataTypes.INTEGER,
	image:		DataTypes.STRING,
	notes:		DataTypes.TEXT
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