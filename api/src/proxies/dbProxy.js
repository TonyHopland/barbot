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
        

export default {
    getRecipeById,
    getAllRecipes,
    createRecipe,
    deleteRecipe,

    getRecipepartById,
    getAllRecipeparts,
    createRecipepart,

    getIngredientById,
    getAllIngredients,
    getIngredientById,

    getSizeById,
    getAllSizes,
    createSize,

    getPumpById,
    getAllPumps,
    createPump,
};
