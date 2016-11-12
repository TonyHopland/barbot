export const REQUEST_DRINKS = 'REQUEST_DRINKS';
export const RECEIVE_DRINKS = 'RECEIVE_DRINKS';
export const SELECT_DRINK = 'SELECT_DRINK';
export const TOGGLE_SLIDEPANEL = 'TOGGLE_SLIDEPANEL';

function requestDrinks() {
  return {
    type: REQUEST_DRINKS,
  };
}

function receiveDrinks(drinkArray) {
  return {
    type: RECEIVE_DRINKS,
    drinks: drinkArray,
    receivedAt: Date.now(),
  };
}

export function fetchDrinks() {
  return (dispatch) => {
    dispatch(requestDrinks());
    return fetch('api/recipes/')
      .then(response => response.json())
      .then(drinkArray => dispatch(receiveDrinks(drinkArray)));
  };
}

export function toggleSlidepanel(newState) {
  return {
    type: TOGGLE_SLIDEPANEL,
    action: newState,
  };
}

export function selectDrink(id) {
  return {
    type: SELECT_DRINK,
    drinkId: id,
  };
}
