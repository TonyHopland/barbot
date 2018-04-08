import { database } from '../../database/db';
import { createIngredient, getAllIngredients, getIngredientById, updateIngredient, deleteIngredient } from '../ingredient';

describe('controllers - ingredient', () => {
  const testIngredients = [
    { name: 'Vodka', color: '#CCFFFF', cl: 100 },
    { name: 'Baileys', color: '#E4C7A3', cl: 100 },
    { name: 'Grenadine', color: '#F12736', cl: 100 },
  ];

  const dummyResponse = { json: () => {} };

  const createTestIngredients = () =>
    createIngredient({ body: testIngredients[0] }, dummyResponse).then(() =>
      createIngredient({ body: testIngredients[1] }, dummyResponse).then(() =>
        createIngredient({ body: testIngredients[2] }, dummyResponse)));

  beforeEach(() => database.init('sqlite://:memory:').sync({ force: true }));

  it('creates a ingredient entry in the database', () => {
    const request = {
      body: testIngredients[0],
    };
    const response = {
      json: jest.fn(),
    };

    return createIngredient(request, response).then(() => {
      expect(response.json.mock.calls.length).toBe(1);
      const ingredient = response.json.mock.calls[0][0];
      expect(ingredient.id).toEqual(1);
      expect(ingredient.name).toEqual(testIngredients[0].name);
      expect(ingredient.color).toEqual(testIngredients[0].color);
      expect(ingredient.cl).toEqual(testIngredients[0].cl);
    });
  });

  it('reads all created ingredient entries from database', () => {
    const getResponse = { json: jest.fn() };

    return createTestIngredients().then(() =>
      getAllIngredients(null, getResponse).then(() => {
        expect(getResponse.json.mock.calls.length).toBe(1);
        const ingredients = getResponse.json.mock.calls[0][0];
        expect(ingredients.length).toEqual(3);
        expect(ingredients[0].id).toEqual(1);
        expect(ingredients[0].name).toEqual(testIngredients[0].name);
        expect(ingredients[0].color).toEqual(testIngredients[0].color);
        expect(ingredients[0].cl).toEqual(testIngredients[0].cl);
        expect(ingredients[1].id).toEqual(2);
        expect(ingredients[1].name).toEqual(testIngredients[1].name);
        expect(ingredients[1].color).toEqual(testIngredients[1].color);
        expect(ingredients[1].cl).toEqual(testIngredients[1].cl);
        expect(ingredients[2].id).toEqual(3);
        expect(ingredients[2].name).toEqual(testIngredients[2].name);
        expect(ingredients[2].color).toEqual(testIngredients[2].color);
        expect(ingredients[2].cl).toEqual(testIngredients[2].cl);
      }));
  });

  it('reads single created size entry with id from database', () => {
    const id = 2;
    const findByIdRequest = { params: { id } };
    const getResponse = { json: jest.fn() };

    return createTestIngredients().then(() =>
      getIngredientById(findByIdRequest, getResponse).then(() => {
        expect(getResponse.json.mock.calls.length).toBe(1);
        const ingredient = getResponse.json.mock.calls[0][0];
        expect(ingredient.id).toEqual(2);
        expect(ingredient.name).toEqual(testIngredients[1].name);
        expect(ingredient.color).toEqual(testIngredients[1].color);
        expect(ingredient.cl).toEqual(testIngredients[1].cl);
      }));
  });

  it('updates single entry with id from database', () => {
    const id = 2;
    const updateRequest = { params: { id }, body: { name: 'Melk', color: '#FFFFFF', cl: 150 } };
    const getResponse = { json: jest.fn() };

    return createTestIngredients().then(() =>
      updateIngredient(updateRequest, dummyResponse).then(() =>
        getAllIngredients(null, getResponse).then(() => {
          expect(getResponse.json.mock.calls.length).toBe(1);
          const ingredients = getResponse.json.mock.calls[0][0];
          expect(ingredients.length).toEqual(3);
          expect(ingredients[0].id).toEqual(1);
          expect(ingredients[0].name).toEqual(testIngredients[0].name);
          expect(ingredients[0].color).toEqual(testIngredients[0].color);
          expect(ingredients[0].cl).toEqual(testIngredients[0].cl);
          expect(ingredients[1].id).toEqual(2);
          expect(ingredients[1].name).toEqual(updateRequest.body.name);
          expect(ingredients[1].color).toEqual(updateRequest.body.color);
          expect(ingredients[1].cl).toEqual(updateRequest.body.cl);
          expect(ingredients[2].id).toEqual(3);
          expect(ingredients[2].name).toEqual(testIngredients[2].name);
          expect(ingredients[2].color).toEqual(testIngredients[2].color);
          expect(ingredients[2].cl).toEqual(testIngredients[2].cl);
        })));
  });

  it('deletes single entry with id from database', () => {
    const id = 2;
    const deleteRequest = { params: { id } };
    const getResponse = { json: jest.fn() };

    return createTestIngredients().then(() =>
      deleteIngredient(deleteRequest, dummyResponse).then(() =>
        getAllIngredients(null, getResponse).then(() => {
          expect(getResponse.json.mock.calls.length).toBe(1);
          const ingredients = getResponse.json.mock.calls[0][0];
          expect(ingredients.length).toEqual(2);
          expect(ingredients[0].id).toEqual(1);
          expect(ingredients[0].name).toEqual(testIngredients[0].name);
          expect(ingredients[0].color).toEqual(testIngredients[0].color);
          expect(ingredients[0].cl).toEqual(testIngredients[0].cl);
          expect(ingredients[1].id).toEqual(3);
          expect(ingredients[1].name).toEqual(testIngredients[2].name);
          expect(ingredients[1].color).toEqual(testIngredients[2].color);
          expect(ingredients[1].cl).toEqual(testIngredients[2].cl);
        })));
  });
});
