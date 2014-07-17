angular.module('barbot')
	.factory('Recipe', function ($resource) {
		return $resource('api/recipes/:recipeId', {
		  recipeId: '@_id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });