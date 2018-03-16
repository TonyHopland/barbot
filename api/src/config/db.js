import Sequelize from'sequelize';
import lodash from 'lodash';

import ingredient from '../models/ingredient';
import pump from '../models/pump';
import recipe from '../models/recipe';
import recipepart from '../models/recipepart';
import size from '../models/size';

const sequelize = new Sequelize('sqlite:barbot.sqlite');

var models = [
  size,
  ingredient,
  pump,
  recipe,
  recipepart,
];

var dbModels = {};

models.forEach(model => {
  const dbModel = model(sequelize);
  dbModels[dbModel.name] = dbModel;
});

dbModels.recipe.hasMany(dbModels.recipepart);
dbModels.pump.belongsTo(dbModels.ingredient);
dbModels.recipepart.belongsTo(dbModels.ingredient);

 export default sequelize;
