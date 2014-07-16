// public/js/appRoutes.js
angular.module('appRoutes',[]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html'
		})

		.when('/create', {
			templateUrl: 'views/create.html'
		})

		.when('/setup', {
			templateUrl: 'views/setup.html'
		})
		
	$locationProvider.html5Mode(true);

}]);

