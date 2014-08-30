 // app/InstructionCreator.js

var db = require('../../config/db.js');

var socket;

exports.Init = function(conn) { 
	socket = conn;
}

exports.CreateDrink = function(drinkId, sizeId) {
	var drink, size;

	db.Size
		.find({ where: { id: sizeId } })
		.then(function(size) {
			db.Recipe
				.find({ where: { id: drinkId }, include: [{ model: db.Recipepart, include: [{model: db.Ingredient, include: [db.Pump]}] } ] })
				.then( function(drink) {

					var instructions = createDrinkInstructions(drink, size);
					console.log("Drink: " + drink.name + " \nSize: " +  size.name);
					var totalTime = dispenseDrink(instructions);
					socket.emit('DispensingTime', totalTime);
				} );
		});
};

getNormalFactor = function (drink) {
	var sum = 0;
	for(var i in drink.recipeparts){
		sum += drink.recipeparts[i].amount;
	}
	return 100/sum;
}

createDrinkInstructions = function(drink, size){
	var normalFactor = getNormalFactor(drink);
	var sizeFactor = size.cl/100;
	var drinkInstructions = [];
	
	for(var i in drink.recipeparts){
		var cl = (drink.recipeparts[i].amount*normalFactor)*sizeFactor;
		drinkInstructions.push(
		{
		'cl': (drink.recipeparts[i].amount*normalFactor)*sizeFactor,
		'time': drink.recipeparts[i].ingredient.pump == null?"0":cl*drink.recipeparts[i].ingredient.pump.msPerCl,
		'order': drink.recipeparts[i].order,
		'startdelay': drink.recipeparts[i].startdelay,
		'pump': drink.recipeparts[i].ingredient.PumpId == null?"-1":drink.recipeparts[i].ingredient.PumpId,
		'ingredient': drink.recipeparts[i].ingredient.name
		});
	}
	return drinkInstructions;
}

dispenseDrink = function (instructions) {
	instructions = instructions.sort(function(a, b) {
        return (b['order'] < a['order']) ? 1 : ((b['order'] > a['order']) ? -1 : 0);
    });
	currentStep = -10000;
	var orderSteps = []
	for(var inst in instructions){
		if(currentStep < instructions[inst].order){
			currentStep = instructions[inst].order
			orderSteps[currentStep] = {};
			orderSteps[currentStep].maxLength = 0;
			orderSteps[currentStep].steps = []
		}
		if(instructions[inst].time + instructions[inst].startdelay > orderSteps[currentStep].maxLength
		&& instructions[inst].pump > 0)
			orderSteps[currentStep].maxLength = instructions[inst].time + instructions[inst].startdelay;
		orderSteps[currentStep].steps.push(instructions[inst]);
	}

	var totalDelay = 0;
	var prevDelay = -5;
	var totalTime = 0;
	for (var step in orderSteps) {
		var noPumpsStarted = true;
		for (var ing in orderSteps[step].steps) {
			var startDelay = (orderSteps[step].maxLength - orderSteps[step].steps[ing].time) + totalDelay;
			if(orderSteps[step].steps[ing].pump > 0){
				console.log("Dispensing: "+orderSteps[step].steps[ing].cl+"cl of " + orderSteps[step].steps[ing].ingredient);
				delayedPumpMilliseconds(orderSteps[step].steps[ing].pump, orderSteps[step].steps[ing].time, startDelay);
				noPumpsStarted = false;
			}
		}
		if(!noPumpsStarted){
			totalDelay += orderSteps[step].maxLength;
		}
		totalTime += orderSteps[step].maxLength;
	}
	return Math.ceil(totalTime);
}