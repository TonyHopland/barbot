import 'style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from 'components/Header/Header';
import Barbot from 'features/Barbot/BarbotContainer';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="barbot">
        <Header />
        <Route exact path="/" component={Barbot} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
