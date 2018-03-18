import dbProxy from '../proxies/dbProxy';

export const getRecipepartById = (req, res) =>
	dbProxy.getRecipepartById(req.params.id)
		.then(recipepart => res.json(recipepart));

export const getAllRecipeparts = (req, res) =>
	dbProxy.getAllRecipeparts()
		.then(recipeparts => res.json(recipeparts));
