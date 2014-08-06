angular.module('barbot')
	.factory('Ingredient', function ($resource) {
		return $resource('api/ingredients/:ingredientId', {
		  ingredientId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });