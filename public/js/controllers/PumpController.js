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
        var pumpToUpdate = new Pump(pump);
        pumpToUpdate.$update();
    }

	$scope.deletePump = function() {
	    var lastIndex = $scope.pumps.length;
	    if(lastIndex > 0) {
	        var pump_to_delete = $scope.pumps[lastIndex -1]
	        pump_to_delete.$delete();
	        $scope.pumps.splice(lastIndex-1, 1);
	    }
	}

    $scope.fillPump = function (pump) {
        startPumpTimed(pump.id, pump.tubeLength);
    }

    $scope.fillAllPumps = function () {
        for(var i = 0; i < $scope.pumps.length; i++) {
            var currentPump = $scope.pumps[i];
            startPumpTimed(currentPump.id, currentPump.tubeLength, pumpStartDelay * i);
        }
    }

	$scope.getPumps(); //Run this at startup to fill the table
});

