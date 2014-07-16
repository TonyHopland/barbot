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
		
		tmpIngredient.$save();
		$scope.ingredients.push(tmpIngredient);
		
	};
	
	$scope.getIngredients(); //Run this at startup to fill the table
});

