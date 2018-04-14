import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <p>React barbot kommer her!</p>
  </div>
);

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

export default App;

