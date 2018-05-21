import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TitleBar from 'components/Titlebar';
import Menu from 'components/Menu';
import { withStyles } from '@material-ui/core/styles';
import basePageStyle from './basePage.style';

class BasePage extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  handleMenuOpen() {
    this.setState({ open: true });
  }

  handleMenuClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, title, children } = this.props;
    return (
      <div className={classes.appFrame}>
        <TitleBar
          title={title}
          menuOpen={this.state.open}
          handleMenuOpen={() => this.handleMenuOpen()}
        />
        <Menu
          open={this.state.open}
          handleMenuClose={() => this.handleMenuClose()}
        />
        <main
          className={classNames(
            classes.content,
            {
              [classes.contentShift]: this.state.open,
            },
          )}
        >
          <div className={classes.drawerHeader} />
          { children }
        </main>
      </div>
    );
  }
}

BasePage.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
};

BasePage.defaultProps = {
  title: undefined,
};

export default withStyles(basePageStyle)(BasePage);
