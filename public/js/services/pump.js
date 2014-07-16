angular.module('barbot')
	.factory('Pump', function ($resource) {
		return $resource('api/pumps/:pumpId', {
		  pumpId: '@_id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });