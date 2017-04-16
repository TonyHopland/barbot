import Ingredient from 'models/ingredient';

export const getIngredients = () =>
  fetch('api/ingredients')
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then(ingredients =>
            ingredients.map(ing => new Ingredient(ing.id, ing.name, ing.color, ing.image)));
      }
      throw new Error('Could not get Ingredients.');
    });

export default {
  getIngredients,
};
