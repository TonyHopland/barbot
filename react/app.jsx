import './styles/main.scss';
const { Component } = React;
import Barbot from './containers/barbot.jsx';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <Barbot />
    </Provider>,
    document.getElementById('app')
);
