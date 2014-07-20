// public/js/controllers/RecipeController.js
angular.module('barbot').controller('DrinkController', function($scope, Drink) {


	$scope.drinks = [];
	$scope.missingDrinks = [];
	$scope.selectedDrink;
	$scope.normalFactor;

	$scope.getDrinks = function () {
		Drink.query(function(response) {
		for(var d = 0; d < response.length; d++) {
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

    $scope.getGlassPart = function (part) {
        return {
            height: $scope.getAmountInPercent(part.amount) + "%",
            background_color: part.ingredient.color
        }
    }

    $scope.getCurrentDrinkNotes = function () {
        if($scope.selectedDrink != undefined) {
            var note = "";
            var missingIngredients = [];
            for(var i in $scope.selectedDrink.recipe){
                if(!$scope.selectedDrink.recipe[i].ingredient.pump) {
                    missingIngredients.push($scope.selectedDrink.recipe[i].ingredient.name);
                }
            }
            if(missingIngredients.length > 0){
                note = "The following ingredients are missing from the machine and have to be added to the drink manually:";
                for (var i in missingIngredients){
                    note = note + "\n" + missingIngredients[i];
                }
                if($scope.selectedDrink.notes != undefined || $scope.selectedDrink.notes)
                    note = note + "\n\n Aditional notes: \n";
            }
            if($scope.selectedDrink.notes != undefined || $scope.selectedDrink.notes)
                note = note + $scope.selectedDrink.notes;
            return note;
        } else {
            return "";
        }
    }

    var makingDrink = false;
    $scope.createDrink = function(size) {
        if(makingDrink){
            alert("Please wait for current drink to finish");
            return;
        }
        if($scope.selectedDrink == undefined || isNaN($scope.normalFactor)){
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
        makingDrink = true;
        dispenseDrink($scope.selectedDrink.name,drinkInstructions);
        var timeToMake = calculateDrinkTime(drinkInstructions);
        console.log(timeToMake);
        setTimeout(function () {
            makingDrink = false;
        }, timeToMake);

        //dispenseDrink(drinkInstructions);
    }

    calculateDrinkTime = function(instructions){
        instructions = instructions.sort(function(a, b) {
            return (b['order'] < a['order']) ? 1 : ((b['order'] > a['order']) ? -1 : 0);
        });
        currentStep = -10000;
        var orderSteps = []
        var totalTime = 0;
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
        }
        for(var step in orderSteps) {
            totalTime += orderSteps[step].maxLength;
        }

        return totalTime;
    }

	$scope.getDrinks(); //Run this at startup to fill the table
});

