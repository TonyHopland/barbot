import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectDrink } from 'features/barbot/barbot.actions';


const MenuComponent = ({ selectedDrink, dispatchSelectDrink }) => {
  const BackButton = selectedDrink
    ? <span className="menu-button" onClick={() => dispatchSelectDrink(null)}>Back</span>
  : <span />;
  return (
    <header>
      {BackButton}
      <h1>{(selectedDrink && selectedDrink.name) || 'Barbot'}</h1>
      <span className="menu-button">settings</span>
    </header>
  );
};

MenuComponent.propTypes = {
  dispatchSelectDrink: PropTypes.func.isRequired,
  selectedDrink: PropTypes.shape({}),
};

const mapStateToProps = ({ barbot }) => ({
  slidepanelOpen: barbot.slidepanelOpen,
  selectedDrink: barbot.selectedDrink,
});

const mapDispatchToProps = dispatch => ({
  dispatchSelectDrink: id => dispatch(selectDrink(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
