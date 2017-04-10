const { RECEIVE_SIZES, REQUEST_SIZES } = require('./sizes.constants');

const sizesReducer = (state = null, action) => {
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
