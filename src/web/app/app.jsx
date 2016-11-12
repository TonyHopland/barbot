import 'styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Barbot from 'features/barbot/Barbot';
import Menu from 'components/menu/Menu';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Menu />
      <Barbot />
    </div>
  </Provider>,
  document.getElementById('app'),
);
