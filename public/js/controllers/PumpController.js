// public/js/controllers/pumpController.js
angular.module('barbot').controller('PumpController', function($scope, Pump) {

	$scope.pumps = [];

	$scope.getPumps = function () {
		Pump.query(function(response) {
        $scope.pumps = response;
      });
	};


    $scope.addPump = function () {
        var index = 0;

        index = $scope.pumps.length;
        var tmpPump = new Pump({
            id: index,
            tubeLength: 1000,
        });
        var newPump = tmpPump.$save();
        if(undefined != newPump){
            $scope.pumps.push(tmpPump);
        }
    };

    $scope.updatePump = function(pump) {
        pump.$update();
        $scope.getPumps(); //TODO: Check for better solution, but without this the object get's wierd
    }

	$scope.deletePump = function() {
	    var lastIndex = $scope.pumps.length;
	    if(lastIndex > 0) {
	        var pump_to_delete = $scope.pumps[lastIndex -1]
	        pump_to_delete.$delete();
	        $scope.pumps.splice(lastIndex-1, 1);
	    }
	}

	$scope.getPumps(); //Run this at startup to fill the table
});

