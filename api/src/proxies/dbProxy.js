import { database } from '../database/db.js';

const include = [{ all: true, nested: true }];

// Recipe
export const getRecipeById = (id) =>
    database.recipe
		.findById(id, { include });

export const getAllRecipes = () =>
    database.recipe
        .findAll({ include });

export const createRecipe = (newRecipe) =>
    database.recipe
        .create(newRecipe, { include: [recipepart] });

export const deleteRecipe = (id) =>
    getRecipeById(id)
        .then(recipe => recipe.destroy());

// Recipepart
export const getRecipepartById = (id) =>
    database.recipepart
        .findById(id, { include });
    
export const getAllRecipeparts = () =>
    database.recipepart
        .findAll({ include });

export const createRecipepart = (newRecipepart) =>
    database.recipepart
        .create(newRecipepart);

export const deleteRecipepart = (id) =>
    getRecipepartById(id)
        .then(recipepart => recipepart.destroy());
    
// Ingredient
export const getIngredientById = (id) =>
    database.ingredient
        .findById(id, { include });
    
export const getAllIngredients = () =>
    database.ingredient
        .findAll({ include });

export const createIngredient = (newIngredient) =>
    database.ingredient
        .create(newIngredient);

export const deleteIngredient = (id) =>
    getIngredientById(id)
        .then(ingredient => ingredient.destroy());

// Size
export const getSizeById = (id) =>
    database.size
        .findById(id, { include });

export const getAllSizes = () =>
    database.size
        .findAll({ include });

export const createSize = (newSize) =>
    database.size
        .create(newSize);

export const deleteSize = (id) =>
    getSizeById(id)
        .then(size => size.destroy());

//Pump
export const getPumpById = (id) =>
    database.pump
        .findById(id, { include });

export const getAllPumps = () =>
    database.pump
        .findAll({ include });

export const createPump = (newPump) =>
    database.pump
        .create(newPump);

export const deletePump = (id) =>
    getPumpById(id)
        .then(pump => pump.destroy());
        

export default {
    getRecipeById,
    getAllRecipes,
    createRecipe,
    deleteRecipe,

    getRecipepartById,
    getAllRecipeparts,
    createRecipepart,
    deleteRecipepart,

    getIngredientById,
    getAllIngredients,
    getIngredientById,
    deleteIngredient,

    getSizeById,
    getAllSizes,
    createSize,
    deleteSize,

    getPumpById,
    getAllPumps,
    createPump,
    deletePump,
};
