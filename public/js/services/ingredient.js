angular.module('barbot')
	.factory('Ingredient', function ($resource) {
		return $resource('api/ingredients/:ingredientId', {
		  ingredientId: '@_id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });