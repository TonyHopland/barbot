import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import titlebarStyle from './titlebar.style';

const Titlebar = ({
  menuOpen,
  handleMenuOpen,
  classes,
  title,
}) => (
  <AppBar
    className={classNames(classes.appBar, {
      [classes.appBarShift]: menuOpen,
    })}
  >
    <Toolbar disableGutters={!menuOpen}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleMenuOpen}
        className={classNames(classes.menuButton, menuOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

Titlebar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
};

Titlebar.defaultProps = {
  title: 'Barbot',
};

export default withStyles(titlebarStyle, { withTheme: true })(Titlebar);
