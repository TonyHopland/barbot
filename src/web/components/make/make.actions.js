export const REQUEST_MAKE_DRINK = 'REQUEST_MAKE_DRINK';
export const MAKING_DRINK = 'MAKING_DRINK';

function requestMakeDrink(drinkId) {
  return {
    type: REQUEST_MAKE_DRINK,
    drinkId,
  };
}

function makingDrink() {
  return {
    type: MAKING_DRINK,
  };
}

export function makeDrink(drinkId, sizeId) {
  return (dispatch) => {
    dispatch(requestMakeDrink());
    return fetch('api/createDrink', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        drinkId,
        sizeId,
      }),
    }).then(response => response.json())
      .then(drinkInfo => dispatch(makingDrink(drinkInfo)));
  };
}
