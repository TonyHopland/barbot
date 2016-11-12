const { REQUEST_SIZES, RECEIVE_SIZES, SELECT_SIZE } = require('./size.actions');
const { SELECT_DRINK } = require('features/barbot/barbot.actions');


const sizeReducer = (state = { sizes: [], selectedSizeId: 99, isFetchingSizes: false }, action) => {
  switch (action.type) {
    case REQUEST_SIZES: {
      return { ...state, isFetchingSizes: true };
    }
    case RECEIVE_SIZES: {
      return { ...state, isFetchingSizes: false, sizes: action.sizes };
    }
    case SELECT_SIZE: {
      return { ...state, selectedSizeId: action.size };
    }
    case SELECT_DRINK: {
      if (!action.maxSize) {
        return state;
      }
      return {
        ...state,
        selectedSizeId: state.selectedSizeId > action.maxSize
          ? action.maxSize
          : state.selectedSizeId,
        maxSize: action.maxSize,
      };
    }
    default: {
      return state;
    }
  }
};

export default sizeReducer;
