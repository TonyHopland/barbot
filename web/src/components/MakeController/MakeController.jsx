import React, { Component} from 'react';
import PropTypes from 'prop-types';

import RecipePart from 'models/recipePart';
import SizeSelector from './components/SizeSelector';
import Loader from './components/Loader';

class MakeController extends Component{

  constructor(props){
    super(props);
    this.state = {
      dispensing: false,
      dispenseTime: -1,
    }

    this.startDispensing = this.startDispensing.bind(this);
    this.dispenseDrink = this.dispenseDrink.bind(this);
  }

  startDispensing(time) {
    console.log('returned time', time);
    this.setState({
      dispensing: true,
      dispenseTime: time,
    })
  }

  dispenseDrink(size){
    this.setState({
      dispensing: true,
      dispenseTime: -1,
    })
    const { name, recipeParts } = this.props;
    const makePromise = this.props.makeDrink(name, recipeParts, size);
    makePromise.then(result => this.startDispensing(result));
  }

  render(){
    const { sizes, maxSize, name, prevSize } = this.props;
    return (
      <div className="s12 m12 l12 xl12">
        { name &&
          <div>
            <h3>{name}</h3>
            <div className="divider" />
          </div>
        }
        { this.state.dispensing
          ?<Loader
            dispenseTime={this.state.dispenseTime}
            onComplete={this.props.onComplete}
          />
          :<SizeSelector
            sizes={sizes}
            maxSize={maxSize}
            prevSize={prevSize}
            onSelect={this.dispenseDrink}
          />
        }
      </div>
    );
  }
};

MakeController.propTypes = {
  recipeParts: PropTypes.arrayOf(PropTypes.instanceOf(RecipePart)).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  makeDrink: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
  prevSize: PropTypes.number,
  maxSize: PropTypes.number,
  name: PropTypes.string,
};

MakeController.defaultProps = {
  prevSize: -1,
  maxSize: -1,
  name: null,
  onComplete: ()=>{},
};

export default MakeController;
