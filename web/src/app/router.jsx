import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { links } from 'common/links';

import BasePage from 'components/BasePage';

import DrinkList from 'pages/DrinkList';
import Create from 'pages/Create';
import Settings from 'pages/Settings';

const animationStyle = {
  position: 'absolute',
  transform: 'translateX(0%)',
  transition: 'all 300ms ease-out',
};

const style = () => ({
  container: {
    position: 'relative',
  },
  anFwdEnter: {
    ...animationStyle,
    transform: 'translateX(100%)',
  },
  anFwdEnterActive: {
    ...animationStyle,
  },
  anBckEnter: {
    ...animationStyle,
    transform: 'translateX(-100%)',
  },
  anBckEnterActive: {
    ...animationStyle,
  },
  exit: {
    ...animationStyle,
    zIndex: -1,
  },
  exitActive: {
    ...animationStyle,
    zIndex: -1,
  },
});

const getAnimationClasses = (state, classes) => {
  let prefix = 'anBck';
  if (state && state.transition === 'forward') {
    prefix = 'anFwd';
  }
  return {
    enter: classes[`${prefix}Enter`],
    enterActive: classes[`${prefix}EnterActive`],
    exit: classes.exit,
    exitActive: classes.exitActive,
  };
};

const Router = ({ classes }) => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <BasePage
          title="Barbot"
          location={location}
        >
          <TransitionGroup className={classes.container} >
            <CSSTransition
              key={location.key}
              classNames={getAnimationClasses(location.state, classes)}
              timeout={300}
            >
              <Switch location={location}>
                <Route exact path="/" render={() => (<Redirect to={links.drinkList} />)} />
                <Route exact path={links.drinkList} component={DrinkList} />
                <Route exact path={links.create} component={Create} />
                <Route exact path={links.settings} component={Settings} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </BasePage>
    )}
    />
  </BrowserRouter>
);

Router.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(style, { withTheme: true })(Router);
