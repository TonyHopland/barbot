// public/js/controllers/RecipeController.js
angular.module('barbot').controller('DrinkController', function($scope, $timeout, Recipe) {

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
		Recipe.query(function(response) {
		for(var d = 0; d < response.length; d++) {
		    var missingIngredients = false;
		    for(var r in response[d].recipeparts){
		        if (response[d].recipeparts[r].ingredient.PumpId == null){
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
	    $scope.selectedDrink = Recipe.selectedDrink = drink;
	    console.log("Selected: " + drink.name);

        if($scope.selectedSize != undefined && $scope.selectedDrink.maxsize < $scope.selectedSize.id){
            $scope.selectedSize = undefined;
        }

        var sum = 0;
        for(var i in $scope.selectedDrink.recipeparts){
            sum += $scope.selectedDrink.recipeparts[i].amount;
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

    $scope.getCurrentDrinkNotes = function () {
        if($scope.selectedDrink != undefined) {
            var note = "";
            var missingIngredients = [];
            for(var i in $scope.selectedDrink.recipeparts){
                if(!$scope.selectedDrink.recipeparts[i].ingredient.PumpId) {
                    missingIngredients.push($scope.selectedDrink.recipeparts[i].ingredient.name);
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

	$scope.initController(); //Run this at startup to fill the table
});

