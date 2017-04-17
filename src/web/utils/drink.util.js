import Ingredient from 'models/ingredient';

export const getIngredientFromRecipePart = (recipePart, ingredients) =>
  ingredients.find(el => el.id === recipePart.ingredientId)
  || new Ingredient(-1, 'Unknown', '#000');

export const isRecipePartAvailable = (recipePart, pumps) =>
  !!pumps.find(el => el.id === recipePart.ingredientId);
