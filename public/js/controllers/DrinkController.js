// public/js/controllers/RecipeController.js
angular.module('barbot').controller('DrinkController', function($scope, $timeout, Recipe, Drink) {

	$scope.drinks = [];
	$scope.drinkService=Drink;
    $scope.progressCss = {};

    $scope.$on("$destroy", function() {
        Drink.selectedDrink = null;
    });

    setDrinks = function(drinks){
        drinks.sort(function(a, b){
            if(a.missingIngredients == b.missingIngredients)
            {
                return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0;
            }
            else
            {
                return (a.missingIngredients < b.missingIngredients) ? -1 : 1;
            }
        });
        $scope.drinks = drinks;
    }

    Recipe.query().$promise.then(setDrinks);


	$scope.selectDrink = function(drink) {
        Drink.selectedDrink = drink;
        console.log("Selected: " + drink.name);
	}

    $scope.getCurrentDrinkNotes = function () {
        var drink = Drink.selectedDrink;
        if(drink != undefined) {
            var note = "";
            var missingIngredients = [];
            for(var i in drink.recipeparts){
                if(!drink.recipeparts[i].ingredient.PumpId) {
                    missingIngredients.push(drink.recipeparts[i].ingredient.name);
                }
            }
            if(missingIngredients.length > 0){
                note = "The following ingredients are missing from the machine and have to be added to the drink manually:";
                for (var i in missingIngredients){
                    note = note + "\n- " + missingIngredients[i];
                }
                if(drink.notes)
                    note = note + "\n\n Aditional notes: \n";
            }
            if(drink.notes)
                note = note + drink.notes;
            return note;
        } else {
            return "";
        }
    }

});

