const { RECEIVE_PUMPS, REQUEST_PUMPS } = require('./pumps.constants');

const pumpsReducer = (state = null, action) => {
  switch (action.type) {
    case REQUEST_PUMPS: {
      return null;
    }
    case RECEIVE_PUMPS: {
      return action.pumps;
    }
    default: {
      return state;
    }
  }
};

export default pumpsReducer;
