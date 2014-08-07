// public/js/controllers/RecipeController.js
angular.module('barbot').controller('MakeController', function($scope, $timeout, Recipe) {

    if(drinkSizes != undefined){
        $scope.drinkSizes = drinkSizes;
    }else{
        $scope.drinkSizes = [
            {
                id: 1,
                name: 'shot',
                size: 15000
            }
        ];
    }
    $scope.selectedSize;
	$scope.progressCss = {};

    var updateSelectedDrink = function(drink){
        if($scope.selectedSize != undefined && drink.maxsize < $scope.selectedSize.id){
            $scope.selectedSize = undefined;
        }
    }

    //Register and unregister watcher for selected drink.
    Recipe.registerWatcher(updateSelectedDrink);
    $scope.$on("$destroy", function() {
        Recipe.unregisterWatcher(updateSelectedDrink);
    });

	$scope.selectSize = function(size) {
	    var drink = Recipe.getSelectedDrink();
        if(drink == undefined) {
            $scope.selectedSize = size;
        }else if(drink.maxsize >= size.id) {
            $scope.selectedSize = size;
        }
	}

    calcNormalFactor = function(drink){
        var sum = 0;
        for(var i in drink.recipeparts){
            sum += drink.recipeparts[i].amount;
        }
        return 100/sum;
    }


    $scope.getProgressCss = function () {
        return {
            //'height': $scope.getAmountInPercent(part.amount) + "%",
            'animation': 'expand 5s'
        }
    }


    var makingDrink = false;
    $scope.createDrink = function() {
        if(makingDrink){
            alert("Please wait for current drink to finish");
            return;
        }
        var drink = Recipe.getSelectedDrink();
        if(drink == undefined){
            alert("Please select a drink");
            return;
        }
        if($scope.selectedSize == undefined){
            alert("Please select a size");
            return;
        }

        var normalFactor = calcNormalFactor(drink);
        var sizeFactor = $scope.selectedSize.size/100;

        var drinkInstructions = [];

        for(var i in drink.recipeparts){
            drinkInstructions.push(
            {
            'time': (drink.recipeparts[i].amount*normalFactor)*sizeFactor,
            'order': drink.recipeparts[i].order,
            'startdelay': drink.recipeparts[i].startdelay,
            'pump': drink.recipeparts[i].ingredient.PumpId == null?"-1":drink.recipeparts[i].ingredient.PumpId,
            'ingredient': drink.recipeparts[i].ingredient.name
            }
            );
        }
        makingDrink = true;
        dispenseDrink(drink.name,drinkInstructions);
        var timeToMake = calculateDrinkTime(drinkInstructions);
        console.log("Making: '" + drink.name + "' Total duration: " + timeToMake);

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

    Recipe.selectedDrink = null;

});

