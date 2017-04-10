import RecipePart from 'models/recipePart';
import Drink from 'models/drink';

export const RECEIVE_DRINKS = 'RECEIVE_DRINKS';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';

export const defaultState = [
  new Drink(
    1,
    'Testdrink on the rocks with a twist of lime and pepper',
    'En veldig god drink og greit for å teste med',
    'test',
    [
      new RecipePart(0, 0, 2), new RecipePart(1, 1, 4), new RecipePart(2, 0, 2),
      new RecipePart(3, 1, 4), new RecipePart(4, 0, 2), new RecipePart(5, 1, 4),
      new RecipePart(6, 0, 2), new RecipePart(7, 1, 4), new RecipePart(8, 2, 0.5),
    ],
  ),
  new Drink(
    2,
    'Monkey brain',
    'This is a nice drink',
    'brain.jpg',
    [new RecipePart(0, 0, 2), new RecipePart(1, 1, 4)],
  ),
  new Drink(
    3,
    'Vodka sunrise',
    'This is a nice drink',
    'vodka_sun.jpg',
    [new RecipePart(0, 1, 4), new RecipePart(1, 0, 2), new RecipePart(2, 2, 0.5)],
  ),
  new Drink(
    4,
    'Atomic watermelon',
    'This is a nice drink',
    'atomicwatermelon.jpg',
    [new RecipePart(0, 0, 2), new RecipePart(1, 1, 4)],
  ),
  new Drink(
    5,
    'Sex on the beach',
    'This is a nice drink',
    'sexonthebeach.jpg',
    [new RecipePart(0, 0, 2), new RecipePart(1, 1, 4)],
  ),
  new Drink(
    6,
    'Sure føtter',
    'Dette er drinken som inspirerte meg til å lage denne maskinen, ironisk nok så kan den ikke lage den på grunn av brus med kullsyre :P',
    'surefotter.jpg',
    [new RecipePart(0, 0, 2), new RecipePart(1, 1, 4)],
  ),
];
