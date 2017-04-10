import React from 'react';
import jquery from 'jquery';
global.$ = jquery;
global.jQuery = jquery;
import '../src/web/style/main.scss';
require('../src/web/lib/materialize/materialize.js');
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DrinkCard from '../src/web/components/DrinkCard/DrinkCard';
import DrinkBreakdown from '../src/web/components/DrinkBreakdown/DrinkBreakdown';

const ingredients=[[
  {
    id: 1,
    name: 'Appelsinjuice',
    color: '#f90',
    amount: 4,
    available: true,
  },
  {
    id: 2,
    name: 'Vodka',
    color: '#eef',
    amount: 1,
    available: true,
  }
],
[
  {
    id: 1,
    name: 'Appelsinjuice',
    color: '#f90',
    amount: 4,
    available: true,
  },
  {
    id: 2,
    name: 'Vodka',
    color: '#eef',
    amount: 1,
    available: true,
  },
  {
    id: 2,
    name: 'Grenadine',
    color: '#f00',
    amount: 0.1,
    available: true,
  }
]];

const drinks = [
  {
    id:1,
    image:"test",
    name:"Testdrink on the rocks with a twist of lime and pepper",
    ingredients:ingredients[0],
    description: "This is a nice drink",
  },
  {
    id:2,
    image:"brain.jpg",
    name:"Monkey brain",
    ingredients:ingredients[0],
    description: "This is a nice drink",
  },
  {
    id:3,
    image:"vodka_sun.jpg",
    name:"Vodka sunrise",
    ingredients:ingredients[1],
    description: "This is a nice drink",
  },
  {
    id:4,
    image:"atomicwatermelon.jpg",
    name:"Atomic watermelon",
    ingredients:ingredients[0],
    description: "This is a nice drink",
  },
  {
    id:5,
    image:"sexonthebeach.jpg",
    name:"Sex on the beach",
    ingredients:ingredients[0],
    description: "This is a nice drink",
  },
];

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
          />
        ))}
      </div>
  )});

storiesOf('DrinkBreakdown', module)
  .add('default', () => {
    return (
      <div className="row" style={{height: '50rem'}}>
        <DrinkBreakdown
          ingredients={ingredients[0]}
        />
      </div>
  )});
