// public/js/controllers/RecipeController.js
angular.module('barbot').controller('DrinkController', function($scope, $timeout, Drink) {

    $scope.drinkSizes = [
        {
            id: 1,
            name: 'shot',
            size: 15000
        }
    ]; //One size is set in case settings are not filled out
	$scope.drinks = [];
	$scope.missingDrinks = [];
	$scope.selectedDrink;
    $scope.selectedSize;
	$scope.normalFactor;

	$scope.progressCss = {};

	$scope.initController = function () {
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
      if(drinkSizes != undefined){
        $scope.drinkSizes = drinkSizes;
      }
	};

	$scope.selectDrink = function(drink) {
	    $scope.selectedDrink = drink;
	    console.log("Selected: " + drink.name);
        calculateNormalFactor();
        if($scope.selectedSize != undefined && $scope.selectedDrink.maxsize < $scope.selectedSize.id){
            $scope.selectedSize = undefined;
        }
	}

	$scope.selectSize = function(size) {
        if($scope.selectedDrink == undefined) {
            $scope.selectedSize = size;
        }else if($scope.selectedDrink.maxsize >= size.id) {
            $scope.selectedSize = size;
            calculateNormalFactor();
        }
	}

    calculateNormalFactor = function(){
        var sum = 0;
        for(var i in $scope.selectedDrink.recipe){
            sum += $scope.selectedDrink.recipe[i].amount;
        }
        $scope.normalFactor = 100/sum;
    }

	$scope.getAmountInPercent = function(amount) {
	    return amount * $scope.normalFactor;
	}

    $scope.getGlassCss = function (part) {
        return {
            height: $scope.getAmountInPercent(part.amount) + "%",
            background_color: part.ingredient.color
        }
    }
    $scope.getIngredientCss = function (part) {
        return {
            //'height': $scope.getAmountInPercent(part.amount) + "%",
            'color': part.ingredient.color
        }
    }
    $scope.getProgressCss = function () {
        return {
            //'height': $scope.getAmountInPercent(part.amount) + "%",
            'animation': 'expand 5s'
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
                    note = note + "\n- " + missingIngredients[i];
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
    $scope.createDrink = function() {
        if(makingDrink){
            alert("Please wait for current drink to finish");
            return;
        }
        if($scope.selectedDrink == undefined || isNaN($scope.normalFactor)){
            alert("Please select a drink");
            return;
        }
        if($scope.selectedSize == undefined){
            alert("Please select a size");
            return;
        }
        var sizeFactor = $scope.selectedSize.size/100;

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

        var roundedTime = Math.ceil(timeToMake);
        $scope.progressCss = {
            '-webkit-animation-name': 'expand',
            '-webkit-animation-duration': roundedTime +'ms',
            '-webkit-animation-timing-function': 'linear',
            '-webkit-animation-fill-mode': 'forwards',
            /* Standard syntax */
            'animation-name': 'expand',
            'animation-duration': timeToMake +'ms',
            'animation-timing-function': 'linear',
            'animation-fill-mode': 'forwards'
        }
        $timeout(function () {
                             $scope.progressCss={};
                             makingDrink = false;
                         }, roundedTime + 500);

        //dispenseDrink(drinkInstructions);
    }

    $scope.getProgressCss = function () {
        return $scope.progressCss;
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

	$scope.initController(); //Run this at startup to fill the table
});

