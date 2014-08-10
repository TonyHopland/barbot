angular.module('barbot')
	.factory('Recipe', function ($resource) {
		return  $resource('api/recipes/:recipeId', {
		  recipeId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	});