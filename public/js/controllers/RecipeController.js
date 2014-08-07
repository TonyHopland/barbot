// public/js/controllers/RecipeController.js
angular.module('barbot').controller('RecipeController', function($scope, Recipe, Recipepart) {


	$scope.recipes = [];
	$scope.recipe = null;

	var recipeModel = {"name":"New Recipe","maxsize":3,"image":"","recipe":[]};
	var recipepartModel = {"amount":0,"order":0,"startdelay":0};

    $scope.drinkSizes = [
        {
            id: 1,
            name: 'shot',
            size: 15000
        }
    ]; //One size is set in case settings are not filled out

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
        recipepart.recipe = $scope.recipe.id;
        recipepart.$save(
            function(rp, putResponseHeaders) {
                $scope.recipe.recipeparts.push(rp);
            }
        );
	}

    $scope.showRecipe = function () {
        if($scope.recipe != null) {
            return {'display': 'block'};
        } else {
            return {'display': 'none'};
        }

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
        $scope.recipe =  null;
        }
        recipe.$delete();
        if(index >= 0){
            $scope.recipes.splice(index, 1);
        }
    }

    $scope.editRecipe = function(recipe) {
        $scope.recipe = recipe;
    }

	$scope.init(); //Run this at startup to fill the table
});

