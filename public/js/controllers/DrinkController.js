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
	$scope.selectedDrink={};

    var updateSelectedDrink = function(drink){
        $scope.selectedDrink = drink
        console.log("Selected: " + drink.name);

        var sum = 0;
        for(var i in drink.recipeparts){
            sum += drink.recipeparts[i].amount;
        }
        $scope.normalFactor = 100/sum;
    }

    Recipe.registerWatcher(updateSelectedDrink);

    $scope.$on("$destroy", function() {
        Recipe.unregisterWatcher(updateSelectedDrink);
    });

	$scope.normalFactor;

	$scope.progressCss = {};


    Recipe.query(function(response) {
        response.sort(function(a, b){
            if(a.missingIngredients == b.missingIngredients)
            {
                return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0;
            }
            else
            {
                return (a.missingIngredients < b.missingIngredients) ? -1 : 1;
            }
        });
        $scope.drinks = response;
    });


	$scope.selectDrink = function(drink) {
	    Recipe.setSelectedDrink(drink);
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

});

