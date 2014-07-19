// public/js/controllers/RecipeController.js
angular.module('barbot').controller('DrinkController', function($scope, Drink) {


	$scope.drinks = [];
	$scope.missingDrinks = [];
	$scope.selectedDrink;
	$scope.normalFactor;

	$scope.getDrinks = function () {
		Drink.query(function(response) {
		for(var d in response){
		    var missingIngredients = false;
		    for(var r in response[d].recipe){
		        if (response[d].recipe[r].ingredient.pump == null){
		            missingIngredients = true;
		            break;
		        }
		    }
		    if(missingIngredients){
		        $scope.missingDrinks.push(response[d]);
		    }else {
                $scope.drinks.push(response[d]);
            }
		}
      });
	};

	$scope.selectDrink = function(drink) {
	    $scope.selectedDrink = drink;
	    console.log("Selected: " + drink.name);
	    var sum = 0;
	    for(var i in drink.recipe){
	        sum += drink.recipe[i].amount;
	    }
	    $scope.normalFactor = 100/sum;
	}

	$scope.getAmountInPercent = function(amount) {
	    return amount * $scope.normalFactor;
	}

    $scope.createDrink = function(size) {
        if($scope.selectedDrink == undefined || isNaN($scope.normalFactor) ){
            //Print error?
            return;
        }
        var sizeFactor = size/100;

        var drinkInstructions = [];

        for(var i in $scope.selectedDrink.recipe){
            drinkInstructions.push(
            {
            'time': $scope.getAmountInPercent($scope.selectedDrink.recipe[i].amount)*sizeFactor,
            'order': $scope.selectedDrink.recipe[i].order,
            'startdelay': $scope.selectedDrink.recipe[i].startdelay,
            'pump': $scope.selectedDrink.recipe[i].ingredient.pump == null?"-1":$scope.selectedDrink.recipe[i].ingredient.pump.id,
            'ingredient': $scope.selectedDrink.recipe[i].ingredient.name
            }
            );
        }

        //console.log(drinkInstructions);
        dispenseDrink(drinkInstructions);
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
                //orderSteps.push(currentStep);
                orderSteps[currentStep] = {};
                orderSteps[currentStep].maxLength = 0;
                orderSteps[currentStep].steps = []
            }
            if(instructions[inst].time + instructions[inst].startdelay > orderSteps[currentStep].maxLength
            && instructions[inst].pump >= 0)
                orderSteps[currentStep].maxLength = instructions[inst].time + instructions[inst].startdelay;
            orderSteps[currentStep].steps.push(instructions[inst]);
        }

        var totalDelay = 0;
        var prevDelay = -5;
        for (var step in orderSteps) {
            var noPumpsStarted = true;
            for (var ing in orderSteps[step].steps) {
                var startDelay = (orderSteps[step].maxLength - orderSteps[step].steps[ing].time) + totalDelay;
                if(prevDelay == startDelay){ //Preventing pumps from starting at exact same time (Being nice to the power supply).
                    startDelay += (pumpStartDelay * ing);
                }else{
                    prevDelay = startDelay;
                }
                if(orderSteps[step].steps[ing].pump >= 0){
                    startPumpTimed(orderSteps[step].steps[ing].pump, orderSteps[step].steps[ing].time, startDelay);
                    noPumpsStarted = false;
                }
            }
            if(!noPumpsStarted){
                totalDelay += orderSteps[step].maxLength;
            }
        }

        console.log(orderSteps);

        //startPumpTimed(currentPump.id, currentPump.tubeLength, pumpStartDelay * i);
    }

	$scope.getDrinks(); //Run this at startup to fill the table
});

