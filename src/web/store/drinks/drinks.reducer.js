const { RECEIVE_DRINKS, REQUEST_DRINKS, defaultState } = require('./drinks.constants');

const drinkSorter = drinks => drinks.slice().sort((a, b) => {
  if (a.missingIngredients === b.missingIngredients) {
    return a.name.localeCompare(b.name);
  }
  return a.missingIngredients - b.missingIngredients;
});

const drinkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_DRINKS: {
      return null;
    }
    case RECEIVE_DRINKS: {
      return drinkSorter(action.drinks);
    }
    default: {
      return state;
    }
  }
};

export default drinkReducer;
