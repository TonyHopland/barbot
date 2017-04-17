import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RecipePart from 'models/recipePart';
import Ingredient from 'models/ingredient';
import Pump from 'models/pump';

import { getIngredientFromRecipePart, isRecipePartAvailable } from 'utils/drink.util';

const DrinkBreakdown = ({ recipeParts, ingredientList, pumpList }) => {
  const sumIngredients = recipeParts.reduce((sum, recipePart) => sum + recipePart.amount, 0);
  const normalFactor = (100 / sumIngredients);

  return (
    <div className="drink-breakdown">
      <div className="drink-breakdown__glass" >
        {recipeParts.map((recipePart) => {
          const ingredient = getIngredientFromRecipePart(recipePart, ingredientList);
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
          const ingredient = getIngredientFromRecipePart(recipePart, ingredientList);
          return (
            <span
              className={
                classnames('drink-breakdown__ingredients-ingredient',
                  {
                    'drink-breakdown__ingredients-ingredient--missing':
                      !isRecipePartAvailable(recipePart, pumpList),
                  },
                )
              }
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
  pumpList: PropTypes.arrayOf(PropTypes.instanceOf(Pump)).isRequired,
};

export default DrinkBreakdown;
