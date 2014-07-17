// public/js/controllers/IngredientController.js
angular.module('barbot').controller('IngredientController', function($scope, Ingredient) {

	$scope.ingredients = [];
	$scope.newIngredient = new Ingredient();
	
	$scope.getIngredients = function () {
		Ingredient.query(function(response) {
        // Update todos if a todo is not being edited
        $scope.ingredients = response;
      });
	};

	$scope.addIngredient = function () {

		var tmpIngredient = new Ingredient({
			name: $scope.newIngredient.name,
			color: $scope.newIngredient.color
		});
		
		var savedIngredient = tmpIngredient.$save();
		if(undefined != savedIngredient){
		    $scope.ingredients.push(tmpIngredient);
		}
		$scope.newIngredient = [];
	};

    $scope.updateIngredient = function(ingredient) {
        var ingredientToUpdate = new Ingredient(ingredient);
        ingredientToUpdate.$update();
    }

	$scope.deleteIngredient = function(index) {
	    var ingredient_to_delete = $scope.ingredients[index];
	    ingredient_to_delete.$delete();
	    $scope.ingredients.splice(index, 1);
	}

	$scope.getIngredients(); //Run this at startup to fill the table
});

