const { combineReducers } = require('redux');

const { RECEIVE_DRINKS, REQUEST_DRINKS, SELECT_DRINK } = require('../actions/actions');

const drinks = (state = { isFetching: false, drinks: [] }, action) => {
  switch (action.type) {
  case REQUEST_DRINKS:
    return Object.assign({}, state, { isFetching: true });
  case RECEIVE_DRINKS:
    return Object.assign({}, state, {isFetching: false, drinks: action.drinks});
  case SELECT_DRINK:
    const selectedDrink = state.drinks.find((drink)=>drink.id===action.drinkId);
    const allParts = selectedDrink && selectedDrink.Recipeparts.reduce((a,b)=>({amount : a.amount + b.amount})).amount;
    console.log(allParts);
    return Object.assign({}, state,{
        selectedDrink: selectedDrink && Object.assign({}, selectedDrink, {Recipeparts: selectedDrink.Recipeparts.map((part) => Object.assign({}, part, {percent: (part.amount / allParts)*100}))}),
        drinks: state.drinks.map((drink) => Object.assign({}, drink, {selected: drink.id === action.drinkId}))
      }
    );
  default:
    return state
  }
}

const rootReducer = drinks;

module.exports = rootReducer;
