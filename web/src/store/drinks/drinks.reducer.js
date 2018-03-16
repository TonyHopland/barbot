const { RECEIVE_DRINKS, REQUEST_DRINKS } = require('./drinks.constants');

const drinkReducer = (state = [], action) => {
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
