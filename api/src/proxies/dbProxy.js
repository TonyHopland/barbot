import { database } from '../database/db';

const include = [{ all: true, nested: true }];

// Recipe
const getRecipeById = id =>
  database.recipe
    .findById(id, { include });

const getAllRecipes = () =>
  database.recipe
    .findAll({ include });

const createRecipe = newRecipe =>
  database.recipe
    .create(newRecipe, { include: [database.recipepart] });

const deleteRecipe = id =>
  getRecipeById(id)
    .then(recipe => recipe.destroy());

// Recipepart
const getRecipepartById = id =>
  database.recipepart
    .findById(id, { include });

const getAllRecipeparts = () =>
  database.recipepart
    .findAll({ include });

const createRecipepart = newRecipepart =>
  database.recipepart
    .create(newRecipepart);

const updateRecipe = (id, updatedRecipe) =>
  getRecipeById(id)
    .then(recipe => recipe.update(updatedRecipe));

const deleteRecipepart = id =>
  getRecipepartById(id)
    .then(recipepart => recipepart.destroy());

// Ingredient
const getIngredientById = id =>
  database.ingredient
    .findById(id, { include });

const getAllIngredients = () =>
  database.ingredient
    .findAll({ include });

const createIngredient = newIngredient =>
  database.ingredient
    .create(newIngredient);

const updateIngredient = (id, updatedIngredient) =>
  getIngredientById(id)
    .then(ingredient => ingredient.update(updatedIngredient));

const deleteIngredient = id =>
  getIngredientById(id)
    .then(ingredient => ingredient.destroy());

// Size
const getSizeById = id =>
  database.size
    .findById(id, { include });

const getAllSizes = () =>
  database.size
    .findAll({ include });

const createSize = newSize =>
  database.size
    .create(newSize);

const updateSize = (id, updatedSize) =>
  getSizeById(id)
    .then(size => size.update(updatedSize));

const deleteSize = id =>
  getSizeById(id)
    .then(size => size.destroy());

// Pump
const getPumpById = id =>
  database.pump
    .findById(id, { include });

const getAllPumps = () =>
  database.pump
    .findAll({ include });

const createPump = newPump =>
  database.pump
    .create(newPump);

const updatePump = (id, updatedPump) =>
  getPumpById(id)
    .then(pump => pump.update(updatedPump));

const deletePump = id =>
  getPumpById(id)
    .then(pump => pump.destroy());


export default {
  getRecipeById,
  getAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,

  getRecipepartById,
  getAllRecipeparts,
  createRecipepart,
  deleteRecipepart,

  getIngredientById,
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,

  getSizeById,
  getAllSizes,
  createSize,
  updateSize,
  deleteSize,

  getPumpById,
  getAllPumps,
  createPump,
  updatePump,
  deletePump,
};
