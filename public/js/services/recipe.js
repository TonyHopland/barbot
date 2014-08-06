angular.module('barbot')
	.factory('Recipe', function ($resource) {

	    var selectedDrink = null;

		var recipeFactory =  $resource('api/recipes/:recipeId', {
		  recipeId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});

		recipeFactory.selectedDrink = selectedDrink;

		return recipeFactory;
	  });