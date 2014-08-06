angular.module('barbot')
	.factory('Recipepart', function ($resource) {
		return $resource('api/recipeparts/:recipepartId', {
		  recipepartId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });