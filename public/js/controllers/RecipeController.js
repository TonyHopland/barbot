// public/js/controllers/RecipeController.js
angular.module('barbot').controller('RecipeController', function($scope, Recipe, Recipepart, Drink) {


	$scope.recipes = [];
	$scope.drinkService = Drink;

	var recipeModel = {"name":"New Recipe","maxsize":3,"image":"","recipe":[]};
	var recipepartModel = {"amount":0,"order":0,"startdelay":0};

    $scope.drinkSizes = [
        {
            id: 1,
            name: 'shot',
            size: 15000
        }
    ]; //One size is set in case settings are not filled out

    $scope.$on("$destroy", function() {
        Drink.selectedDrink = null;
    });

	$scope.init = function () {
        Recipe.query(function(response) {
            response.sort(function(a, b){
                return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0;
            });
            $scope.recipes = response;
        });
        if(drinkSizes != undefined){
          $scope.drinkSizes = drinkSizes;
        }
	};

	$scope.AddRecipepart = function () {
        recipepart = new Recipepart(recipepartModel);
        recipepart.recipe = Drink.selectedDrink.id;
        recipepart.$save(
            function(rp, putResponseHeaders) {
                Drink.selectedDrink.recipeparts.push(rp);
            }
        );
	}

    $scope.showRecipe = function () {
        if(Drink.selectedDrink != null) {
            return {'display': 'block'};
        } else {
            return {'display': 'none'};
        }

    }

    $scope.saveRecipepart = function (recipepart) {
        var recipepart = new Recipepart(recipepart);
        recipepart.$update(function(rp, putResponseHeaders) {
                                           Drink.updateDrinkPartIngredient(rp);
                                   });
    }

    $scope.saveRecipe = function() {
        Drink.selectedDrink.$update();
    }

    $scope.newRecipe = function () {
        Drink.selectedDrink = new Recipe(recipeModel);
        Drink.selectedDrink.$save(function(rp, putResponseHeaders) {
                $scope.recipes.push(rp);
        });
    }

	$scope.deleteRecipepart = function(recipepart) {
        recipepartToDelete = new Recipepart(recipepart);
        recipepartToDelete.$delete();
        var index = Drink.selectedDrink.recipeparts.indexOf(recipepart);
	    if(index >= 0){
             Drink.selectedDrink.recipeparts.splice(index, 1);
        }

	}
    $scope.deleteRecipe = function(recipe) {
        var index = $scope.recipes.indexOf(recipe);
        if(Drink.selectedDrink == recipe){
        Drink.selectedDrink =  null;
        }
        recipe.$delete();
        if(index >= 0){
            $scope.recipes.splice(index, 1);
        }
    }

    $scope.editRecipe = function(recipe) {
        Drink.selectedDrink = recipe;
    }

	$scope.init(); //Run this at startup to fill the table
});

