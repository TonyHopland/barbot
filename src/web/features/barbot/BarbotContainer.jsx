import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drink from 'models/drink';
import Ingredient from 'models/ingredient';
import Pump from 'models/pump';

import DrinkCard from 'components/DrinkCard/DrinkCard';
import DrinkBreakdown from 'components/DrinkBreakdown/DrinkBreakdown';

import { sortByMissingIngredients } from 'utils/sort.util';

import { requestIngredients } from 'store/ingredients/ingredients.actions';
import { requestDrinks } from 'store/drinks/drinks.actions';
import { requestPumps } from 'store/pumps/pumps.actions';

class Barbot extends Component {

  componentDidMount() {
    this.props.dispatchRequestIngredients();
    this.props.dispatchRequestDrinks();
    this.props.dispatchRequestPumps();
    // TODO: Fetch data for the different stores here!
  }

  render() {
    const { drinks, ingredients, pumps } = this.props;
    const sortedDrinks = sortByMissingIngredients(drinks, pumps);
    return (
      <div className="row">
        {sortedDrinks.map(drink => (
          <DrinkCard
            key={drink.id}
            image={drink.image}
            name={drink.name}
          >
            <DrinkBreakdown
              recipeParts={drink.recipeParts}
              ingredientList={ingredients}
              pumpList={pumps}
            />
            <p>{drink.description}</p>
            <button
              title="Make drink"
              data-target="make-modal"
              className="btn__make btn-floating btn-large waves-effect waves-light red"
            >
              <i className="large material-icons">invert_colors</i>
            </button>
          </DrinkCard>
        ))}

      </div>
    );
  }
}

Barbot.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.instanceOf(Drink)).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient).isRequired).isRequired,
  pumps: PropTypes.arrayOf(PropTypes.instanceOf(Pump).isRequired).isRequired,
  dispatchRequestIngredients: PropTypes.func.isRequired,
  dispatchRequestDrinks: PropTypes.func.isRequired,
  dispatchRequestPumps: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    drinks: state.drinks,
    ingredients: state.ingredients,
    pumps: state.pumps,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchRequestIngredients: () => dispatch(requestIngredients()),
    dispatchRequestDrinks: () => dispatch(requestDrinks()),
    dispatchRequestPumps: () => dispatch(requestPumps()),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Barbot);
