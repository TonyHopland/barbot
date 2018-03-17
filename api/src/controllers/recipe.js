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
// /**
//  * Find recipe by id and store it in the request
//  */
// exports.recipeId = function(req, res, next, id) {
// 	db.recipe.find({
// 		where: { id: id },
// 		include: [{ model: db.recipepart, include: [db.ingredient] }],
// 		order: [ [ db.recipepart, 'order' ] ] })
// 		.then(function(recipe) {
// 			if (!recipe) {
// 				new Error('Failed to load recipe ' + id);
// 			} else {
// 				req.recipe = recipe;
// 				next();
// 			}
// 		},function(err) {
// 				new Error('Failed to load recipe ' + id+': ' + err);
// 		});
// };

// exports.recipe = function(req, res) {
// 	res.json(req.recipe);
// };

// /**
//  * List of recipes
//  */
// exports.query = function(req, res) {
// 	db.recipe.findAll({
// 			include: [{ model: db.recipepart, include: [db.ingredient] }]
// 	})
// 		.then(function(recipe) {
// 		res.json(recipe);
// 	});
// };


// /**
//  * Create a recipe
//  */
// exports.create = function(req, res) {
// 	db.recipe
// 		.create(req.body)
// 			.then(function(err, recipe) {
// 				res.json(recipe);
// 			});
// };

// /**
//  * Update a recipe
//  */
// exports.update = function(req, res) {

// var recipe = req.recipe;
// recipe.name = req.body.name;
// recipe.maxsize = req.body.maxsize;
// recipe.image = req.body.image;
// recipe.notes = req.body.notes;

// if(req.body.recipepart){
// 	for(part in req.body.recipepart){
// 		db.recipepart
// 			.find({ where: { id: req.body.recipepart[part].id }})
// 			.then(function(err, recipepart) {
// 				if (!!err) {
// 					new Error('Failed to load recipepart ' + id+': ' + err);
// 				} else if (!recipepart) {
// 					new Error('Failed to load recipepart ' + id);
// 				} else {
// 					recipe.setRecipepart(recipepart);
// 				}
// 			})
// 	}
// }

// recipe.save();
// res.json(recipe);

// };

// /**
//  * Remove a recipe
//  */
// exports.remove = function(req, res) {
//     db.recipe.destroy(
// 		{id: req.recipe.id} /* where criteria */,
// 		{} /* options */
// 	);
// 	db.recipepart.destroy(
// 		{RecipeId: req.recipe.id} /* where criteria */,
// 		{} /* options */
// 	);
// };
