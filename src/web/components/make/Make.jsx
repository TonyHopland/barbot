import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { makeDrink } from './make.actions';


const SizeComponent = ({ drinkId, sizeId, dispatchMakeDrink }) =>
  <div>
    <button
      type="button"
      onClick={() => dispatchMakeDrink(drinkId, sizeId)}
      className="make-button"
    >MAKE</button>
  </div>;


SizeComponent.propTypes = {
  drinkId: PropTypes.number.isRequired,
  sizeId: PropTypes.number.isRequired,
  dispatchMakeDrink: PropTypes.func.isRequired,
};

const mapStateToProps = ({ size, barbot }) => ({
  sizeId: size.selectedSizeId,
  drinkId: barbot.selectedDrink.id,
});

const mapDispatchToProps = dispatch => ({
  dispatchMakeDrink: (drinkId, sizeId) => dispatch(makeDrink(drinkId, sizeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SizeComponent);
