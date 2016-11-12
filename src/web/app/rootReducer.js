import { combineReducers } from 'redux';
import barbotReducer from 'features/barbot/barbot.reducer';


export default combineReducers({
  barbot: barbotReducer
});
