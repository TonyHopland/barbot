angular.module('barbot')
	.factory('Pump', function ($resource) {
		return $resource('api/pumps/:pumpId', {
		  pumpId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });