import Sequelize from'sequelize';
import lodash from 'lodash';

import ingredientModel from './models/ingredient';
import pumpModel from './models/pump';
import recipeModel from './models/recipe';
import recipepartModel from './models/recipepart';
import sizeModel from './models/size';

const modelsCreators = [
  sizeModel,
  ingredientModel,
  pumpModel,
  recipeModel,
  recipepartModel,
];

export class Database {
  constructor() {
  }

  init(dbPath = 'sqlite:barbot.sqlite') {
    const database = new Sequelize(dbPath, { operatorsAliases: false, logging: false });

    const dbModels = {};
    modelsCreators.forEach(model => {
      const dbModel = model(database);
      dbModels[dbModel.name] = dbModel;
    });

    dbModels.recipe.hasMany(dbModels.recipepart, {onDelete: 'CASCADE'});
    dbModels.ingredient.hasOne(dbModels.pump);
    dbModels.recipepart.belongsTo(dbModels.ingredient);

    this.recipe = database.models.recipe;
    this.recipepart =  database.models.recipepart;
    this.ingredient =  database.models.ingredient;
    this.pump =  database.models.pump;
    this.size =  database.models.size;

    return database;
  }
}

export let database = new Database();