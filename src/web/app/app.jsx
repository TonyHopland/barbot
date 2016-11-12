import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Barbot from 'features/barbot/Barbot';
import configureStore from './configureStore';
import 'styles/main';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Barbot />
  </Provider>,
  document.getElementById('app'),
);
