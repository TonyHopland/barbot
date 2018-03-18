import dbProxy from '../proxies/dbProxy';

export const getRecipeById = (req, res) =>
	dbProxy.getRecipeById(req.params.id)
		.then(recipe => res.json(recipe));

export const getAllRecipes = (req, res) =>
	dbProxy.getAllRecipes()
		.then(recipes => res.json(recipes));

export const createRecipe = (req, res) => {
	var newRecipe = req.body;
	// Todo: Validate newRecipe

	dbProxy.createRecipe(newRecipe)
		.then(recipe => res.json(recipe));
}

export const deleteRecipe = (req, res) => {
	dbProxy.deleteRecipe(req.params.id)
		.then(recipe => res.json(recipe));
}
