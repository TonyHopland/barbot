import React from 'react';
import jquery from 'jquery';
global.$ = jquery;
global.jQuery = jquery;
import '../src/web/style/main.scss';
require('../src/web/lib/materialize/materialize.js');
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DrinkCard from 'components/DrinkCard/DrinkCard';
import DrinkBreakdown from 'components/DrinkBreakdown/DrinkBreakdown';
import MakeController from 'components/MakeController/MakeController';

import {defaultState as drinks} from 'store/drinks/drinks.constants';
import {defaultState as ingredients} from 'store/ingredients/ingredients.constants';
import {defaultState as sizes} from 'store/sizes/sizes.constants';


storiesOf('DrinkCard', module)
  .add('default', () => {
    return (
      <div className="row">
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            id={drink.id}
            isAvailable
            image={drink.image}
            name={drink.name}
            ingredients={drink.ingredients}
            description={drink.description}
          >
            <DrinkBreakdown
              recipeParts={drink.recipeParts}
              ingredientList={ingredients}
            />
          </DrinkCard>
        ))}
      </div>
  )});

storiesOf('DrinkBreakdown', module)
  .add('default', () => {
    return (
      <div className="row" style={{height: '25rem'}}>
        <DrinkBreakdown
          recipeParts={drinks[0].recipeParts}
          ingredientList={ingredients}
        />
      </div>
  )});

storiesOf('MakeController', module)
  .add('Size selector', () => {
    return (
      <div className="row" style={{ margin: '2rem', height: '25rem'}}>
        <div className="card col s5">
            <div className="card-content">
              <MakeController
                sizes={sizes}
                prevSize={2}
                name="Tony's testdrink"
                makeDrink={() => Promise.resolve(5000)}
                onComplete={action('onComplete')}
                recipeParts={drinks[0].recipeParts}
              />
            </div>
          </div>
      </div>
  )});
