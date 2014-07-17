// public/js/controllers/RecipeController.js
angular.module('barbot').controller('RecipeController', function($scope, Recipe, Recipepart) {


	$scope.recipes = [];
	$scope.recipe = new Recipe();

	$scope.getRecipes = function () {
		Recipe.query(function(response) {
        $scope.recipes = response;
      });
	};

	$scope.AddIngredient = function () {
	    if($scope.recipe.recipe == undefined)
	        $scope.recipe.recipe = [];
	    $scope.recipe.recipe.push(new Recipepart());
	}

    $scope.saveRecipe = function() {
        //var recipeToUpdate = new Recipe($scope.recipe);
        if($scope.recipe._id == undefined){ //Save new recipe
            $scope.recipe.$save();
        }else {
            $scope.recipe.$update();
        }
    }
    $scope.newRecipe = function () {
        $scope.recipe = new Recipe();
    }

    $scope.editRecipe = function(recipe) {
        $scope.recipe = recipe;
    }

    $scope.cancel = function() {
        $scope.getRecipes();
        $scope.recipe = new Recipe();
    }
/*
    $scope.addPump = function () {
        var index = 0;

        index = $scope.pumps.length;
        var tmpPump = new Pump({
            id: index,
            tubeLength: 1000,
        });
        var newPump = tmpPump.$save();
        if(undefined != newPump){
            $scope.pumps.push(tmpPump);
        }
    };

	$scope.deletePump = function() {
	    var lastIndex = $scope.pumps.length;
	    if(lastIndex > 0) {
	        var pump_to_delete = $scope.pumps[lastIndex -1]
	        pump_to_delete.$delete();
	        $scope.pumps.splice(lastIndex-1, 1);
	    }
	}

    $scope.fillPump = function (pump) {
        startPumpTimed(pump.id, pump.tubeLength);
    }

    $scope.fillAllPumps = function () {
        for(var i = 0; i < $scope.pumps.length; i++) {
            var currentPump = $scope.pumps[i];
            startPumpTimed(currentPump.id, currentPump.tubeLength, pumpStartDelay * i);
        }
    }
*/
	$scope.getRecipes(); //Run this at startup to fill the table
});

