angular.module('barbot')
	.factory('Recipepart', function ($resource) {
		return $resource('api/recipeparts/:recipepartId', {
		  recipepartId: '@_id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });