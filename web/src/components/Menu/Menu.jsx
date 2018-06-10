import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import NewIcon from '@material-ui/icons/FiberNew';
import { withStyles } from '@material-ui/core/styles';
import {
  getDrinkListLink,
  getCreateLink,
  getSettingsLink,
} from 'common/links';
import menuStyle from './menu.style';

const Menu = ({
  open,
  handleMenuClose,
  classes,
  location,
}) => (
  <Drawer
    variant="persistent"
    anchor="right"
    open={open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleMenuClose}>
        <ChevronRightIcon />
      </IconButton>
    </div>
    <Divider />
    <ListItem button component={NavLink} to={getDrinkListLink(location)}>
      <ListItemIcon>
        <LocalBarIcon />
      </ListItemIcon>
      <ListItemText primary="Make" />
    </ListItem>
    <ListItem button component={NavLink} to={getCreateLink(location)}>
      <ListItemIcon>
        <NewIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItem>
    <Divider />
    <ListItem button component={NavLink} to={getSettingsLink(location)}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </Drawer>
);

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(menuStyle, { withTheme: true })(Menu);
