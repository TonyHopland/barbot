const { RECEIVE_SIZES, REQUEST_SIZES, defaultState } = require('./sizes.constants');

const sizesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_SIZES: {
      return null;
    }
    case RECEIVE_SIZES: {
      return action.sizes;
    }
    default: {
      return state;
    }
  }
};

export default sizesReducer;
