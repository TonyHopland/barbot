const { RECEIVE_DRINKS, REQUEST_DRINKS, SELECT_DRINK, TOGGLE_SLIDEPANEL } = require('./barbot.actions');

const drinkSorter = (drinks) => drinks.slice().sort((a,b) => {
  if(a.missingIngredients === b.missingIngredients) {
    return a.name.localeCompare(b.name)
  }
  return a.missingIngredients-b.missingIngredients;
});


const barbotReducer = (state = { isFetching: false, drinks: [] }, action) => {
  switch (action.type) {
    case REQUEST_DRINKS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_DRINKS:
      return Object.assign({}, state, {isFetching: false, drinks: drinkSorter(action.drinks)});
    case SELECT_DRINK:
      const selectedDrink = state.drinks.find((drink)=>drink.id===action.drinkId);
      const allParts = selectedDrink && selectedDrink.Recipeparts.reduce((a,b)=>({amount : a.amount + b.amount})).amount;
      console.log(allParts);
      return Object.assign({}, state,{
          slidepanelOpen: true,
          selectedDrink: selectedDrink && Object.assign({}, selectedDrink, {Recipeparts: selectedDrink.Recipeparts.map((part) => Object.assign({}, part, {percent: (part.amount / allParts)*100}))}),
          drinks: state.drinks.map((drink) => Object.assign({}, drink, {selected: drink.id === action.drinkId}))
        }
      );
    case TOGGLE_SLIDEPANEL:
      if(action.action) {
        if(action.action === 'open')
          return Object.assign({}, state,{ slidepanelOpen: true })
        if(action.action === 'closed')
          return Object.assign({}, state,{ slidepanelOpen: false })
      }
      return Object.assign({}, state,{ slidepanelOpen: !state.slidepanelOpen })

    default:
      return state
  }
}

export default barbotReducer;
