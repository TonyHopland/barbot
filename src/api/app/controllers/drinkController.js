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
							ingredientService.subtractCl(usage[i].ingredientId, usage[i].cl);
							if(usage[i].remaining < 15){
								lowIngredients.push(usage[i].ingredient);
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
			res.status(400).send('Ingen størrelse valgt');
		});
};

getNormalFactor = function (drink) {
	var sum = 0;
	for(var i in drink.recipeparts){
		sum += drink.recipeparts[i].amount;
	}
	return 100/sum;
}

 getUsage = function(drink, size){
	 var normalFactor = getNormalFactor(drink);
	 var sizeFactor = size.cl/100;
	 var usage = [];

	 for(var i in drink.recipeparts){
		 if(drink.recipeparts[i].ingredient.PumpId){
			 var cl = (drink.recipeparts[i].amount*normalFactor)*sizeFactor;
			 usage.push(
				 {
					 'cl': cl,
					 'remaining': drink.recipeparts[i].ingredient.cl - cl,
					 'ingredient': drink.recipeparts[i].ingredient.name,
					 'ingredientId': drink.recipeparts[i].ingredient.id
				 });
			}
	 }
	 return usage;
 }

createDrinkInstructions = function(drink, size){
	var normalFactor = getNormalFactor(drink);
	var sizeFactor = size.cl/100;
	var drinkInstructions = [];
	
	for(var i in drink.recipeparts){
		var cl = (drink.recipeparts[i].amount*normalFactor)*sizeFactor;
		drinkInstructions.push(
		{
		'cl': cl,
		'time': drink.recipeparts[i].ingredient.pump == null?"0":cl*drink.recipeparts[i].ingredient.pump.msPerCl,
		'order': drink.recipeparts[i].order,
		'startdelay': drink.recipeparts[i].startdelay,
		'pump': drink.recipeparts[i].ingredient.PumpId == null?"-1":drink.recipeparts[i].ingredient.PumpId,
		'ingredient': drink.recipeparts[i].ingredient.name,
		'ingredientId': drink.recipeparts[i].ingredient.id
		});
	}
	return drinkInstructions;
}
