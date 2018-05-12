import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import BasePage from 'components/BasePage';

import Make from 'pages/Make';
import Create from 'pages/Create';
import Settings from 'pages/Settings';

const Router = () => (
  <BrowserRouter>
    <BasePage
      title="Barbot"
    >
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/make" />)} />
        <Route exact path="/make" component={Make} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </BasePage>
  </BrowserRouter>
);

export default Router;
