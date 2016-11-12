import React, { PropTypes } from 'react';
import IngredientThumb from './ingredient_thumb';

const DrinkDetail = ({ drink }) => {
  if (!drink) {
    return (<h2>No drink selected</h2>);
  }
  let warning = null;
  if (drink.missingIngredients > 0) {
    const missingIngredients = [];
    drink.Recipeparts.forEach((rp) => {
      if (rp.Ingredient.PumpId == null) {
        missingIngredients.push(<li key={rp.id}>{rp.Ingredient.name}</li>);
      }
    });
    warning = (
      <div className="warning">The Barbot is missing the following ingredients for this drink:
        <ul>{missingIngredients}</ul>
        If you make this drink the Barbot will dispence only the available ingredients.
      </div>
    );
  }
  return (
    <div className="drink_detail">
      <h2 className="drink_detail__title">{drink.name}</h2>
      <div className="drink_detail__ingredients">
        <h3>Ingredients</h3>
        <div className="ingredientglass" >
          {drink.Recipeparts.map(rpart =>
            <div
              key={rpart.id}
              style={{
                height: `${rpart.percent}%`,
                backgroundColor: rpart.Ingredient.color,
              }}
            />,
          )}
        </div>
        <div className="ingredient_overview">
          {drink.Recipeparts.map(rpart =>
            <IngredientThumb
              key={rpart.id}
              name={rpart.Ingredient.name}
              isAvailable={rpart.Ingredient.PumpId !== null}
              image=""
              color={rpart.Ingredient.color}
            />,
          )}
        </div>
      </div>
      <div className="drink_detail__messages">
        {warning}
        {
          drink.notes
          ? <div className="notes">{drink.notes}</div>
          : null
        }
      </div>
    </div>
  );
};

DrinkDetail.propTypes = {
  drink: PropTypes.shape({}),
};

export default DrinkDetail;
