import { isRecipePartAvailable } from 'utils/drink.util';

const getMissingIngredientsReducer = pumps => (value, recipePart) =>
  (!isRecipePartAvailable(recipePart, pumps) ? value + 1 : value);


export const sortByMissingIngredients = (drinks, pumps) =>
  drinks.sort((drinkA, drinkB) => {
    const missingA = drinkA.recipeParts.reduce(getMissingIngredientsReducer(pumps), 0);
    const missingB = drinkB.recipeParts.reduce(getMissingIngredientsReducer(pumps), 0);
    const availableA = drinkA.recipeParts.length - missingA;
    const availableB = drinkB.recipeParts.length - missingB;

    if (availableA === 0 && availableB > 0) {
      return 1;
    }
    if (availableB === 0 && availableA > 0) {
      return -1;
    }
    if (missingA > missingB) {
      return 1;
    }
    if (missingA < missingB) {
      return -1;
    }
    if (drinkA.name > drinkB.name) {
      return 1;
    }
    if (drinkA.name < drinkB.name) {
      return -1;
    }
    return 0;
  });

export default {
  sortByMissingIngredients,
};
