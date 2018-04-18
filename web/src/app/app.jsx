import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';

const App = () => (
  <Router />
);

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

export default renderApp;
