import React from 'react';
import PropTypes from 'prop-types';

import RecipePart from 'models/recipePart';
import Ingredient from 'models/ingredient';

const DrinkBreakdown = ({ recipeParts, ingredientList }) => {
  const sumIngredients = recipeParts.reduce((sum, recipePart) => sum + recipePart.amount, 0);
  const normalFactor = (100 / sumIngredients);

  const getIngredient = (recipePart, ingredients) =>         // TODO: Move to util
    ingredients.find(el => el.id === recipePart.ingredient)
    || new Ingredient(-1, 'Unknown', '#000');

  return (
    <div className="drink-breakdown">
      <div className="drink-breakdown__glass" >
        {recipeParts.map((recipePart) => {
          const ingredient = getIngredient(recipePart, ingredientList);
          return (
            <span
              key={recipePart.id}
              className="drink-breakdown__glass-ingredient"
              style={{
                height: `${recipePart.amount * normalFactor}%`,
                backgroundColor: ingredient.color,
              }}
            />
          );
        })}
      </div>
      <div className="drink-breakdown__ingredients">
        {recipeParts.map((recipePart) => {
          const ingredient = getIngredient(recipePart, ingredientList);
          return (
            <span
              className="drink-breakdown__ingredients-ingredient"
              key={recipePart.id}
            >
              {`${recipePart.amount} x ${ingredient.name}`}
            </span>
          );
        })}
      </div>
    </div>
  );
};


DrinkBreakdown.propTypes = {
  recipeParts: PropTypes.arrayOf(PropTypes.instanceOf(RecipePart)).isRequired,
  ingredientList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
};

export default DrinkBreakdown;
