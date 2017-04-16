const { RECEIVE_DRINKS, REQUEST_DRINKS, defaultState } = require('./drinks.constants');

const drinkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_DRINKS: {
      return [];
    }
    case RECEIVE_DRINKS: {
      return action.drinks;
    }
    default: {
      return state;
    }
  }
};

export default drinkReducer;
