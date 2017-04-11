import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {
  render(){
    return (
      <div className="loader">
        <h4>Dispensing drink:</h4>
        <div className="loader progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }
};

Loader.propTypes = {
  dispenseTime: PropTypes.number.isRequired,
  completeCallback: PropTypes.func,
};

Loader.defaultProps = {
  completeCallback: () => {},
};

export default Loader;
