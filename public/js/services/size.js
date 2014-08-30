angular.module('barbot')
	.factory('Size', function ($resource) {
		return $resource('api/sizes/:sizeId', {
		  sizeId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});
	  });