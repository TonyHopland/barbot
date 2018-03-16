import { getDrinks } from 'services/drink.service';
import { REQUEST_DRINKS, RECEIVE_DRINKS, ERROR_DRINKS } from './drinks.constants';

export const requestDrinks = () => (dispatch) => {
  dispatch({ type: REQUEST_DRINKS });
  getDrinks()
    .then(drinks =>
      dispatch({
        type: RECEIVE_DRINKS,
        drinks,
      }),
    )
    .catch((e) => {
      dispatch({
        type: ERROR_DRINKS,
        error: e,
      });
    });
};

export default {
  requestDrinks,
};
