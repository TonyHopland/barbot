import { getIngredients } from 'services/ingredients.service';
import { REQUEST_INGREDIENTS, RECEIVE_INGREDIENTS, ERROR_INGREDIENTS } from './ingredients.constants';

export const initIngredients = () => (dispatch) => {
  dispatch({ type: REQUEST_INGREDIENTS });
  getIngredients()
    .then(ingredients =>
      dispatch({
        type: RECEIVE_INGREDIENTS,
        ingredients,
      }),
    )
    .catch(() =>
      dispatch({
        type: ERROR_INGREDIENTS,
      }),
    );
};

export default {
  initIngredients,
};
