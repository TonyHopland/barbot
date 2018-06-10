import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import basePageStyle from './subPage.style';

const SubPage = ({ classes, children }) => (
  <div className={classes.subPage}>
    { children }
  </div>
);

SubPage.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(basePageStyle)(SubPage);
