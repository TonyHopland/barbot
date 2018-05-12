import {
  getIngredients,
  isAvailable,
} from '../drink.util';

const testDrink = {
  id: 1,
  name: 'Sure føtter',
  image: 'surefotter.jpg',
  notes: null,
  createdAt: '2018-04-09T19:28:57.998Z',
  updatedAt: '2018-04-09T19:28:57.998Z',
  recipeparts: [{
    id: 2,
    amount: 1,
    order: 0,
    startdelay: 0,
    createdAt: '2018-04-09T19:28:57.998Z',
    updatedAt: '2018-04-09T19:28:57.998Z',
    recipeId: 1,
    ingredientId: 5,
    ingredient: {
      id: 5,
      name: 'Jagermeister',
      color: '#140A00',
      cl: 100,
      createdAt: '2018-04-09T19:28:57.998Z',
      updatedAt: '2018-04-09T19:28:57.998Z',
      pump: {
        id: 5,
        msPerCl: 5000,
        createdAt: '2018-04-09T19:28:58.013Z',
        updatedAt: '2018-04-09T19:28:58.013Z',
        ingredientId: 5,
      },
    },
  }, {
    id: 3,
    amount: 1,
    order: 0,
    startdelay: 0,
    createdAt: '2018-04-09T19:28:57.998Z',
    updatedAt: '2018-04-09T19:28:57.998Z',
    recipeId: 1,
    ingredientId: 7,
    ingredient: {
      id: 7,
      name: 'Midori',
      color: '#00FF00',
      cl: 100,
      createdAt: '2018-04-09T19:28:57.998Z',
      updatedAt: '2018-04-09T19:28:57.998Z',
      pump: {
        id: 7, msPerCl: 5000, createdAt: '2018-04-09T19:28:58.013Z', updatedAt: '2018-04-09T19:28:58.013Z', ingredientId: 7,
      },
    },
  }, {
    id: 1,
    amount: 1,
    order: 0,
    startdelay: 0,
    createdAt: '2018-04-09T19:28:57.998Z',
    updatedAt: '2018-04-09T19:28:57.998Z',
    recipeId: 1,
    ingredientId: 15,
    ingredient: {
      id: 15, name: 'Vodka', color: '#CCFFFF', cl: 100, createdAt: '2018-04-09T19:28:57.998Z', updatedAt: '2018-04-09T19:28:57.998Z', pump: null,
    },
  }, {
    id: 4,
    amount: 2,
    order: 0,
    startdelay: 0,
    createdAt: '2018-04-09T19:28:57.998Z',
    updatedAt: '2018-04-09T19:28:57.998Z',
    recipeId: 1,
    ingredientId: 2,
    ingredient: {
      id: 2,
      name: 'Cola',
      color: '#000000',
      cl: 100,
      createdAt: '2018-04-09T19:28:57.998Z',
      updatedAt: '2018-04-09T19:28:57.998Z',
      pump: {
        id: 2, msPerCl: 5000, createdAt: '2018-04-09T19:28:58.013Z', updatedAt: '2018-04-09T19:28:58.013Z', ingredientId: 2,
      },
    },
  }, {
    id: 5,
    amount: 2,
    order: 0,
    startdelay: 0,
    createdAt: '2018-04-09T19:28:57.998Z',
    updatedAt: '2018-04-09T19:28:57.998Z',
    recipeId: 1,
    ingredientId: 13,
    ingredient: {
      id: 13, name: 'Sweet & Sour mix', color: '#ffff46', cl: 100, createdAt: '2018-04-09T19:28:57.998Z', updatedAt: '2018-04-09T19:28:57.998Z', pump: null,
    },
  }],
};

describe('drink.util - getIngredients', () => {
  it('should return a list of ingredients', () => {
    const expected = [
      {
        id: 5,
        name: 'Jagermeister',
        color: '#140A00',
        amount: 1,
        available: true,
      }, {
        id: 7,
        name: 'Midori',
        color: '#00FF00',
        amount: 1,
        available: true,
      }, {
        id: 15,
        name: 'Vodka',
        color: '#CCFFFF',
        amount: 1,
        available: false,
      }, {
        id: 2,
        name: 'Cola',
        color: '#000000',
        amount: 2,
        available: true,
      }, {
        id: 13,
        name: 'Sweet & Sour mix',
        color: '#ffff46',
        amount: 2,
        available: false,
      },
    ];
    expect(getIngredients(testDrink)).toEqual(expected);
  });
});

describe('drink.util - isAvailable', () => {
  it('should return false if some ingredients does not have a pump', () => {
    const expected = false;
    expect(isAvailable(testDrink)).toEqual(expected);
  });
});

