import { PropTypes } from 'react';
import IngredientThumb from './ingredient_thumb.jsx';

const DrinkPreview = ({drink}) => {
  if(!drink) return (<h2>No drink selected</h2>);

  return (
    <div className="drink_detail">
      <h2 className="title">{drink.name}</h2>
      <div className="ingredients">
        <h3>Ingredients</h3>
        <div className="ingredientglass" >
          {drink.Recipeparts.map((rpart, i) =>
            <div key={rpart.id} style={{height: rpart.percent + '%', 'backgroundColor': rpart.Ingredient.color}} ></div>
          )}
        </div>
        <div className="ingredient_overview">
          {drink.Recipeparts.map((rpart, i) =>
            <IngredientThumb key={rpart.id} isAvailable = {rpart.Ingredient.PumpId !== null} image = "" color = {rpart.Ingredient.color} name = {rpart.Ingredient.name} />
          )}
        </div>
      </div>
    </div>
  )
}

DrinkPreview.propTypes = {
  drink: PropTypes.object,
}

export default DrinkPreview;
