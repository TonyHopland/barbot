import Ingredient from 'models/ingredient';

export const getIngredientFromRecipePart = (recipePart, ingredients) =>
  ingredients.find(el => el.id === recipePart.ingredientId)
  || new Ingredient(-1, 'Unknown', '#000');

export const isRecipePartAvailable = (recipePart, pumps) =>
  !!pumps.find(el => el.id === recipePart.ingredientId);

export const isDrinkAvailable = (recipeParts, pumps) => {
  for (let i = 0; i < recipeParts.length; i += 1) {
    if (!isRecipePartAvailable(recipeParts[i], pumps)) {
      return false;
    }
  }
  return true;
};
