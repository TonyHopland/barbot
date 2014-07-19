// public/js/controllers/RecipeController.js
angular.module('barbot').controller('RecipeController', function($scope, Recipe, Recipepart) {


	$scope.recipes = [];
	$scope.recipe = new Recipe();

	var recipeModel = {"name":"New Recipe","maxsize":3,"image":"","recipe":[]};
	var recipepartModel = {"amount":0,"order":0,"startdelay":0};

	$scope.getRecipes = function () {
		Recipe.query(function(response) {
        $scope.recipes = response;
      });
	};

	$scope.AddRecipepart = function () {
	    if($scope.recipe._related == undefined)
    	    $scope.recipe._related = [];
	    if($scope.recipe._related.recipe == undefined)
	        $scope.recipe._related.recipe = [];
	    recipepart = new Recipepart(recipepartModel);
	    recipepart.$save(function(rp, putResponseHeaders) {
        	    $scope.recipe._related.recipe.push(rp);
        	    $scope.recipe.recipe.push(rp._id);
        	    $scope.saveRecipe();
        });

	}

    $scope.saveRecipepart = function (recipepart) {
        var recipepartToUpdate = new Recipepart(recipepart);
        recipepartToUpdate.$update();
    }

    $scope.saveRecipe = function() {
        var recipeToUpdate = new Recipe($scope.recipe);
        recipeToUpdate.$update();
    }

    $scope.newRecipe = function () {
        $scope.recipe = new Recipe(recipeModel);
        $scope.recipe.$save(function(rp, putResponseHeaders) {
                $scope.recipes.push(rp);
        });
    }

	$scope.deleteRecipepart = function(recipepart) {
	    var index = $scope.recipe.recipe.indexOf(recipepart._id);
	    var indexrel = $scope.recipe._related.recipe.indexOf(recipepart);
        recipepart = new Recipepart(recipepart);
        recipepart.$delete();
        if(indexrel >= 0){
            $scope.recipe._related.recipe.splice(indexrel, 1);
	    }
	    if(index >= 0){
             $scope.recipe.recipe.splice(index, 1);
        }
        $scope.saveRecipe();
	}
    $scope.deleteRecipe = function(recipe) {
        var index = $scope.recipes.indexOf(recipe);
        if($scope.recipe == recipe){
        $scope.recipe =  new Recipe();
        }
        recipe.$delete();
        if(index >= 0){
            $scope.recipes.splice(index, 1);
        }
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

