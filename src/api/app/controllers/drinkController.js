 // app/InstructionCreator.js

var db = require('../../config/db.js');
var hardware = require('./pumpHardware.js');
var ingredientService = require('./ingredient.js');

exports.Init = function(conn) {
	socket = conn;
}

exports.CreateDrink = function(req, res) {
	var drinkId = req.body.drinkId;
	var sizeId = req.body.sizeId;

	db.Size
		.find({ where: { id: sizeId } })
		.then(function(size) {
			db.Recipe
				.find({ where: { id: drinkId }, include: [{ model: db.Recipepart, include: [{model: db.Ingredient, include: [db.Pump]}] } ] })
				.then( function(drink) {
					var instructions = createDrinkInstructions(drink, size);
					var usage = getUsage(drink, size);
					var totalTime = hardware.dispenseDrink(drink.name, instructions);
					if(totalTime > 0){
						var lowIngredients = [];
						for(var i in usage) {
							ingredientService.subtractCl(usage[i].IngredientId, usage[i].cl);
							if(usage[i].remaining < 15){
								lowIngredients.push(usage[i].Ingredient);
							}
						}
						res.json({dispensingTime: totalTime, lowIngredients: lowIngredients});
					} else {
						res.status(400).send('Please wait for barbot to finish before making a drink.');
					}

				})
				.catch(function(){
					res.status(400).send('Ingen drink valgt');
				});;
		})
		.catch(function(){
			res.status(400).send('Ingen st�rrelse valgt');
		});
};

getNormalFactor = function (drink) {
	var sum = 0;
	for(var i in drink.Recipeparts){
		sum += drink.Recipeparts[i].amount;
	}
	return 100/sum;
}

 getUsage = function(drink, size){
	 var normalFactor = getNormalFactor(drink);
	 var sizeFactor = size.cl/100;
	 var usage = [];

	 for(var i in drink.Recipeparts){
		 if(drink.Recipeparts[i].Ingredient.PumpId){
			 var cl = (drink.Recipeparts[i].amount*normalFactor)*sizeFactor;
			 usage.push(
				 {
					 'cl': cl,
					 'remaining': drink.Recipeparts[i].Ingredient.cl - cl,
					 'ingredient': drink.Recipeparts[i].Ingredient.name,
					 'ingredientId': drink.Recipeparts[i].Ingredient.id
				 });
			}
	 }
	 return usage;
 }

createDrinkInstructions = function(drink, size){
	var normalFactor = getNormalFactor(drink);
	var sizeFactor = size.cl/100;
	var drinkInstructions = [];
	for(var i in drink.Recipeparts){
		var cl = (drink.Recipeparts[i].amount*normalFactor)*sizeFactor;
		drinkInstructions.push(
		{
		'cl': cl,
		'time': drink.Recipeparts[i].Ingredient.Pump == null?"0":cl*drink.Recipeparts[i].Ingredient.Pump.msPerCl,
		'order': drink.Recipeparts[i].order,
		'startdelay': drink.Recipeparts[i].startdelay,
		'pump': drink.Recipeparts[i].Ingredient.PumpId == null?"-1":drink.Recipeparts[i].Ingredient.PumpId,
		'ingredient': drink.Recipeparts[i].Ingredient.name,
		'ingredientId': drink.Recipeparts[i].Ingredient.id
		});
	}
	return drinkInstructions;
}
