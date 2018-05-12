export const getIngredients = drink =>
  drink.recipeparts.map(rp => ({
    id: rp.ingredient.id,
    name: rp.ingredient.name,
    color: rp.ingredient.color,
    amount: rp.amount,
    available: !!rp.ingredient.pump,
  }));

export const getNumberOfMissingIngredients = drink =>
  drink.recipeparts.filter(rp => !rp.ingredient.pump).length;

export const isAvailable = drink =>
  getNumberOfMissingIngredients(drink) === 0;


export const getSortedList = drinks =>
  drinks.sort((drinkA, drinkB) => {
    const missingA = getNumberOfMissingIngredients(drinkA);
    const missingB = getNumberOfMissingIngredients(drinkB);
    if (missingA === missingB) {
      return drinkA.name.localeCompare(drinkB.name);
    }
    return missingA - missingB;
  });
