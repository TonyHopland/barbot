import dbProxy from '../proxies/dbProxy';

export const getIngredientById = (req, res) =>
  dbProxy.getIngredientById(req.params.id)
    .then(ingredient => res.json(ingredient));

export const getAllIngredients = (req, res) =>
  dbProxy.getAllIngredients()
    .then(ingredients => res.json(ingredients));

export const createIngredient = (req, res) => {
  const newIngredient = req.body;
  // Todo: Validate newIngredient

  return dbProxy.createIngredient(newIngredient)
    .then(ingredient => res.json(ingredient));
};

export const updateIngredient = (req, res) => {
  const newIngredient = req.body;
  // Todo: Validate ingredient

  return dbProxy.updateIngredient(req.params.id, newIngredient)
    .then(ingredient => res.json(ingredient));
};

export const deleteIngredient = (req, res) =>
  dbProxy.deleteIngredient(req.params.id)
    .then(ingredient => res.json(ingredient));
