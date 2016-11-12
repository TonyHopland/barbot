import { combineReducers } from 'redux';
import sizeReducer from 'components/size/size.reducer';
import barbotReducer from 'features/barbot/barbot.reducer';


export default combineReducers({
  barbot: barbotReducer,
  size: sizeReducer,
});
