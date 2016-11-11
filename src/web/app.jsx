// import './styles/main.scss';
import { Component } from 'react';
import { Provider } from 'react-redux';
import Barbot from './containers/barbot.jsx';
import configureStore from './store/configureStore';
import './styles/main.scss';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <Barbot />
    </Provider>,
    document.getElementById('app')
);
