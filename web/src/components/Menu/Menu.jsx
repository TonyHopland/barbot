import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import NewIcon from '@material-ui/icons/FiberNew';
import { withStyles } from 'material-ui/styles';
import menuStyle from './menu.style';

const Menu = ({
  open,
  handleMenuClose,
  classes,
}) => (
  <Drawer
    variant="persistent"
    open={open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleMenuClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <ListItem button component={Link} to="/make">
      <ListItemIcon>
        <LocalBarIcon />
      </ListItemIcon>
      <ListItemText primary="Make" />
    </ListItem>
    <ListItem button component={Link} to="/create">
      <ListItemIcon>
        <NewIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItem>
    <Divider />
    <ListItem button component={Link} to="/settings">
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
};

export default withStyles(menuStyle, { withTheme: true })(Menu);
