import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/modal/Modal';
import { fetchSizes } from 'components/size/size.actions';
import DrinkThumb from './components/drink_thumb';
import DrinkDetail from './components/drink_detail';
import { fetchDrinks, selectDrink } from './barbot.actions';


class BarbotComponent extends Component {
  componentDidMount() {
    const { dispatchFetchDrinks, dispatchFetchSizes } = this.props;
    dispatchFetchDrinks();
    dispatchFetchSizes();
  }

  render() {
    const {
      drinks,
      selectedDrink,
      dispatchSelectDrink,
    } = this.props;

    const drinkView = selectedDrink
      ? <DrinkDetail drink={selectedDrink} />
      : null;

    return (
      <div className="absolute-fill">
        <div className="flex_container">
          {drinks.map(drink =>
            <DrinkThumb
              {...drink}
              key={drink.id}
              onSelect={dispatchSelectDrink}
              selected={selectedDrink && selectedDrink.id === drink.id}
              isAvailable={drink.missingIngredients === 0}
            />,
          )}
        </div>
        <Modal onClose={() => dispatchSelectDrink(null)}>
          {drinkView}
        </Modal>
      </div>
    );
  }
}

BarbotComponent.propTypes = {
  dispatchSelectDrink: PropTypes.func.isRequired,
  dispatchFetchDrinks: PropTypes.func.isRequired,
  dispatchFetchSizes: PropTypes.func.isRequired,
  drinks: PropTypes.shape([]),
  selectedDrink: PropTypes.shape({}),
};

const mapStateToProps = ({ barbot }) => ({
  drinks: barbot.drinks,
  isFetching: barbot.isFetching,
  selectedDrink: barbot.selectedDrink,
});

const mapDispatchToProps = dispatch => ({
  dispatchSelectDrink: (id, maxSize) => dispatch(selectDrink(id, maxSize)),
  dispatchFetchDrinks: () => dispatch(fetchDrinks()),
  dispatchFetchSizes: () => dispatch(fetchSizes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarbotComponent);
