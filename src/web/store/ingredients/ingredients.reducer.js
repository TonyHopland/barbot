const {
  RECEIVE_INGREDIENTS,
  REQUEST_INGREDIENTS,
  defaultState,
} = require('./ingredients.constants');

const ingredientsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_INGREDIENTS: {
      return [];
    }
    case RECEIVE_INGREDIENTS: {
      return action.ingredients;
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;
