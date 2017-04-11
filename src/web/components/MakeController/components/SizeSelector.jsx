import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SizeSelector extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedSize: -1,
    }
  }

  componentDidMount(){
    $('select').material_select();
    this.setState({
      selectedSize: this.props.prevSize,
    })
  }

  updateSelectedSize(size){
    this.setState({
      selectedSize: size,
    })
  }

  render(){
    const { sizes, submit } = this.props;
    return (
      <div className="size-selector center-align">
        <div className="section">
          <h4 className="left-align">Choose size:</h4>
          {sizes.map(size => (
            <button
              className={classnames(
                'size-selector__btn btn-large waves-effect waves-light',
                {
                  'red accent-4': size.id === this.state.selectedSize,
                }
              )}
              key={size.id}
              value={size.id}
              onClick={() => this.updateSelectedSize(size.id)}
            >
              {size.name}
            </button>
          ))}
        </div>
        <div className="divider" />
        <div className="section">
          <h4 className="left-align">Dispense drink:</h4>
          <button
            className="btn-large waves-effect waves-light red accent-4"
            type="button"
            name="makeDrink"
            onClick={() => this.props.onSelect(this.state.selectedSize)}
          >
            Make
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    );
  };
}

SizeSelector.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  prevSize: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

SizeSelector.defaultProps = {
  prevSize: -1,
};

export default SizeSelector;
