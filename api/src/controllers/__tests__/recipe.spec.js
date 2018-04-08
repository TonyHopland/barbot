import { database } from '../../database/db';
import { createIngredient } from '../ingredient';
import { getAllRecipeparts } from '../recipepart';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../recipe';

describe('controllers - recipe', () => {
  const testRecipes = [
    {
      name: 'Screwdriver',
      image: 'screwdriver.jpg',
      notes: '',
      recipeparts: [
        {
          amount: 1,
          order: 1,
          startdelay: 700,
          ingredientId: 1,
        },
        {
          amount: 2,
          order: 1,
          startdelay: 700,
          ingredientId: 2,
        },
      ],
    },
    {
      name: 'Screwdriver sunshine',
      image: 'screwdriver_sun.jpg',
      notes: 'just a screwdriver with grenadine',
      recipeparts: [
        {
          amount: 4,
          order: 1,
          startdelay: 0,
          ingredientId: 1,
        },
        {
          amount: 10,
          order: 1,
          startdelay: 0,
          ingredientId: 2,
        },
        {
          amount: 1,
          order: 2,
          startdelay: 1000,
          ingredientId: 3,
        },
      ],
    },
  ];

  const testIngredients = [
    { name: 'Vodka', color: '#CCFFFF', cl: 100 },
    { name: 'Orange juice', color: '#FFCC00', cl: 100 },
    { name: 'Grenadine', color: '#F12736', cl: 100 },
  ];

  const dummyResponse = { json: () => {} };

  const createTestIngredients = () =>
    createIngredient({ body: testIngredients[0] }, dummyResponse).then(() =>
      createIngredient({ body: testIngredients[1] }, dummyResponse).then(() =>
        createIngredient({ body: testIngredients[2] }, dummyResponse)));

  const createTestRecipes = () =>
    createRecipe({ body: testRecipes[0] }, dummyResponse).then(() =>
      createRecipe({ body: testRecipes[1] }, dummyResponse));

  beforeEach(() => database.init('sqlite://:memory:').sync({ force: true }).then(createTestIngredients));

  it('creates a recipe entry in the database with correct recipeparts', () => {
    const request = {
      body: testRecipes[0],
    };
    const response = {
      json: jest.fn(),
    };

    return createRecipe(request, response).then(() => {
      expect(response.json.mock.calls.length).toBe(1);
      const recipe = response.json.mock.calls[0][0];
      expect(recipe.id).toEqual(1);
      expect(recipe.name).toEqual(testRecipes[0].name);
      expect(recipe.image).toEqual(testRecipes[0].image);
      expect(recipe.notes).toEqual(testRecipes[0].notes);
      expect(recipe.recipeparts.length).toEqual(2);
    });
  });

  it('reads all created recipes entries from database', () => {
    const getResponse = { json: jest.fn() };

    return createTestRecipes().then(() =>
      getAllRecipes(null, getResponse).then(() => {
        expect(getResponse.json.mock.calls.length).toBe(1);
        const recipes = getResponse.json.mock.calls[0][0];
        expect(recipes.length).toEqual(2);
        expect(recipes[0].id).toEqual(1);
        expect(recipes[0].name).toEqual(testRecipes[0].name);
        expect(recipes[0].image).toEqual(testRecipes[0].image);
        expect(recipes[0].notes).toEqual(testRecipes[0].notes);
        expect(recipes[0].recipeparts.length).toEqual(2);
        expect(recipes[1].id).toEqual(2);
        expect(recipes[1].name).toEqual(testRecipes[1].name);
        expect(recipes[1].image).toEqual(testRecipes[1].image);
        expect(recipes[1].notes).toEqual(testRecipes[1].notes);
        expect(recipes[1].recipeparts.length).toEqual(3);
      }));
  });

  it('reads single created recipe entry with id from database', () => {
    const id = 2;
    const findByIdRequest = { params: { id } };
    const getResponse = { json: jest.fn() };

    return createTestRecipes().then(() =>
      getRecipeById(findByIdRequest, getResponse).then(() => {
        expect(getResponse.json.mock.calls.length).toBe(1);
        const recipe = getResponse.json.mock.calls[0][0];
        expect(recipe.id).toEqual(2);
        expect(recipe.name).toEqual(testRecipes[1].name);
        expect(recipe.image).toEqual(testRecipes[1].image);
        expect(recipe.notes).toEqual(testRecipes[1].notes);
        expect(recipe.recipeparts.length).toEqual(3);
      }));
  });

  it('updates single entry with id from database', () => {
    const id = 2;
    const updateRequest = {
      params: { id },
      body: {
        name: 'Screwdriver sunshine v2',
        image: 'screwdriver_sun_2.jpg',
        notes: 'just a screwdriver with grenadine version 2',
        recipeparts: [
          {
            amount: 4,
            order: 1,
            startdelay: 0,
            ingredientId: 1,
          },
          {
            amount: 10,
            order: 1,
            startdelay: 0,
            ingredientId: 2,
          },
          {
            amount: 2,
            order: 2,
            startdelay: 1000,
            ingredientId: 3,
          },
        ],
      },
    };
    const getResponse = { json: jest.fn() };

    return createTestRecipes().then(() =>
      updateRecipe(updateRequest, dummyResponse).then(() =>
        getAllRecipes(null, getResponse).then(() => {
          expect(getResponse.json.mock.calls.length).toBe(1);
          const recipes = getResponse.json.mock.calls[0][0];
          expect(recipes.length).toEqual(2);
          expect(recipes[0].id).toEqual(1);
          expect(recipes[0].name).toEqual(testRecipes[0].name);
          expect(recipes[0].image).toEqual(testRecipes[0].image);
          expect(recipes[0].notes).toEqual(testRecipes[0].notes);
          expect(recipes[0].recipeparts.length).toEqual(2);
          expect(recipes[1].id).toEqual(2);
          expect(recipes[1].name).toEqual(updateRequest.body.name);
          expect(recipes[1].image).toEqual(updateRequest.body.image);
          expect(recipes[1].notes).toEqual(updateRequest.body.notes);
          expect(recipes[1].recipeparts.length).toEqual(3);
          getAllRecipeparts(null, getResponse).then(() => {
            const recipeparts = getResponse.json.mock.calls[1][0];
            expect(recipeparts.length).toEqual(5);
            expect(recipeparts[4].startdelay).toEqual(1000);
          });
        })));
  });

  it('deletes single entry with id from database and recipeparts linked to recipe', () => {
    const id = 2;
    const deleteRequest = { params: { id } };
    const getResponse = { json: jest.fn() };

    return createTestRecipes().then(() =>
      deleteRecipe(deleteRequest, dummyResponse).then(() =>
        getAllRecipes(null, getResponse).then(() => {
          expect(getResponse.json.mock.calls.length).toBe(1);
          const recipes = getResponse.json.mock.calls[0][0];
          expect(recipes.length).toEqual(1);
          expect(recipes[0].id).toEqual(1);
          expect(recipes[0].name).toEqual(testRecipes[0].name);
          expect(recipes[0].image).toEqual(testRecipes[0].image);
          expect(recipes[0].notes).toEqual(testRecipes[0].notes);
          expect(recipes[0].recipeparts.length).toEqual(2);
          getAllRecipeparts(null, getResponse).then(() => {
            const recipeparts = getResponse.json.mock.calls[1][0];
            expect(recipeparts.length).toEqual(2);
          });
        })));
  });
});
