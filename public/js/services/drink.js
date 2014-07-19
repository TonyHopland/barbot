angular.module('barbot')
	.factory('Drink', function ($resource) {
		return $resource('api/drinks/:drinkId', {
		  recipeId: '@_id'
		});
	  });