 // app/routes.js
 import bodyParser from 'body-parser';
import {getIngredientById, getAllIngredients, createIngredient} from '../controllers/ingredient';
import {getRecipeById, getAllRecipes, createRecipe, deleteRecipe} from '../controllers/recipe';
import {getRecipepartById, getAllRecipeparts} from '../controllers/recipepart';
import {getPumpById, getAllPumps, createPump} from '../controllers/pump';
import {getSizeById, getAllSizes, createSize} from '../controllers/size';

export default app => {

	app.use(bodyParser.json());

	app.use((req, res, next) => {
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires",0);
		next();
	});
	
	app.get('/api/ingredient/:id', getIngredientById);
	app.get('/api/ingredient', getAllIngredients);
	// app.post('/api/ingredient', createIngredient);

	app.get('/api/recipepart/:id', getRecipepartById);
	app.get('/api/recipepart', getAllRecipeparts);

	app.get('/api/recipe/:id', getRecipeById);
	app.get('/api/recipe', getAllRecipes);
	app.post('/api/recipe', createRecipe);
	app.delete('/api/recipe/:id', deleteRecipe);

	app.get('/api/size/:id', getSizeById);
	app.get('/api/size', getAllSizes);
	// app.post('/api/size', createSize);

	app.get('/api/pump/:id', getPumpById);
	app.get('/api/pump', getAllPumps);
	app.post('/api/pump', createPump);

};
