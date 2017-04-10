import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'store/rootReducer';

const logger = createLogger();
/* eslint-disable no-underscore-dangle */
export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        logger, // neat middleware that logs actions
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
/* eslint-enable */
  return store;
}
