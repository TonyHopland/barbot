import Ingredient from 'models/ingredient';

export const RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';

export const defaultState = [
  new Ingredient(
    0,
    'Vodka',
    '#eef',
  ),
  new Ingredient(
    1,
    'Appelsinjuice',
    '#f90',
  ),
  new Ingredient(
    2,
    'Grenadine',
    '#f00',
  ),
];
