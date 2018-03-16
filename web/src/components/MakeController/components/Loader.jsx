import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      intervalId: -1,
    }
    this.updateProgress = this.updateProgress.bind(this);
  }

  updateProgress() {
    const { progress, intervalId } = this.state;

    if(intervalId >= 0) {
      const newProgress = progress + 1;
      if(newProgress >= 100) {
        clearInterval(this.state.intervalId);
        this.setState({
          progress: 100,
          intervalId: -1,
        });
        setTimeout(
          this.props.onComplete(),
          300  // adding timeout to wait for animation to finish
        );
      } else {
        this.setState({
          progress: newProgress,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dispenseTime > 0 && nextProps.dispenseTime !== this.props.dispenseTime) {
      const intervalId = setInterval(
        this.updateProgress,
        ((nextProps.dispenseTime <= 300)
          ? 1
          : (nextProps.dispenseTime-300) / 100) // Making room for last part of line to animate
      );
      this.setState({
        progress: 0,
        intervalId: intervalId
      })
    }
  }

  render(){
    return (
      <div className="loader">
        <h4>Dispensing drink:</h4>
        <div className="loader progress">
          {(this.props.dispenseTime < 0)
            ?<div className="indeterminate" />
            :<div
              className="determinate"
              style={{
                width: `${this.state.progress}%`,
              }}
            />
          }
        </div>
      </div>
    );
  }
};

Loader.propTypes = {
  dispenseTime: PropTypes.number.isRequired,
  onComplete: PropTypes.func,
};

Loader.defaultProps = {
  onComplete: () => {},
};

export default Loader;
