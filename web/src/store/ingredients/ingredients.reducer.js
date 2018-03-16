const {
  RECEIVE_INGREDIENTS,
  REQUEST_INGREDIENTS,
} = require('./ingredients.constants');

const ingredientsReducer = (state = [], action) => {
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
