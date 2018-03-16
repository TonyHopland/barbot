import Drink from 'models/drink';
import RecipePart from 'models/recipePart';

export const getDrinks = () =>
  fetch('api/drink')
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then(drinks =>
            drinks.map(drink => new Drink(
              drink.id,
              drink.name,
              drink.notes,
              drink.image,
              drink.recipeparts.map(rp => new RecipePart(
                rp.id,
                rp.ingredientId,
                rp.amount,
                rp.order,
                rp.startdelay,
              )),
            drink.maxsize,
            )));
      }
      throw new Error('Could not get drinks.');
    });

export default {
  getDrinks,
};
