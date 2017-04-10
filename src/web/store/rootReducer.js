import { combineReducers } from 'redux';
import drinksReducer from './drinks/drinks.reducer';
import ingredientsReducer from './ingredients/ingredients.reducer';
import sizesReducer from './sizes/sizes.reducer';
import pumpsReducer from './pumps/pumps.reducer';


export default combineReducers({
  drinks: drinksReducer,
  ingredients: ingredientsReducer,
  sizes: sizesReducer,
  pumps: pumpsReducer,
});
