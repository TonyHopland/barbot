import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';

import Router from './router';

const App = () => (
  <div>
    <CssBaseline />
    <Router />
  </div>
);

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

export default renderApp;
