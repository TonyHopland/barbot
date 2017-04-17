import { getPumps } from 'services/pump.service';
import { GLOBAL_ERROR } from 'app/app.constants';
import { REQUEST_PUMPS, RECEIVE_PUMPS } from './pumps.constants';

export const requestPumps = () => (dispatch) => {
  dispatch({ type: REQUEST_PUMPS });
  getPumps()
    .then(pumps =>
      dispatch({
        type: RECEIVE_PUMPS,
        pumps,
      }),
    )
    .catch(e =>
      dispatch({
        type: GLOBAL_ERROR,
        error: e,
      }),
    );
};

export default {
  requestPumps,
};
