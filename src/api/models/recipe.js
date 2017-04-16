module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('recipe', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
  	name: 		DataTypes.STRING,
	  maxsize: 	DataTypes.INTEGER,
	  image:		DataTypes.STRING,
	  notes:		DataTypes.TEXT,
  }, {
    timestamps: false,
    classMethods: {
        associate: function(models) {
            Recipe.hasMany(models.recipepart);
        }
    }
  });

  return Recipe
};
