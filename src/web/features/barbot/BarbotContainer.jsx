import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drink from 'models/drink';
import Ingredient from 'models/ingredient';

import DrinkCard from 'components/DrinkCard/DrinkCard';
import DrinkBreakdown from 'components/DrinkBreakdown/DrinkBreakdown';

import { initIngredients } from 'store/ingredients/ingredients.actions';

class Barbot extends Component {

  componentDidMount() {
    this.props.dispatchGetIngredients();
    // TODO: Fetch data for the different stores here!
  }

  render() {
    const { drinks, ingredients } = this.props;
    return (
      <div className="row">
        {drinks.map(drink => (
          <DrinkCard
            key={drink.id}
            image={drink.image}
            name={drink.name}
          >
            <DrinkBreakdown
              recipeParts={drink.recipeParts}
              ingredientList={ingredients}
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
  dispatchGetIngredients: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    drinks: state.drinks,
    ingredients: state.ingredients,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatchGetIngredients: () => dispatch(initIngredients()),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Barbot);
