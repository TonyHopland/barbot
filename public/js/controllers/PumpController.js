// public/js/controllers/pumpController.js
angular.module('barbot').controller('PumpController', function($scope, Pump) {


	$scope.pumps = [];
	$scope.pumpstate = [];

	$scope.getPumps = function () {
		Pump.query(function(response) {
        $scope.pumps = response;
      });
	};

    $scope.addPump = function () {
        var index = 0;

        index = $scope.pumps.length+1;
        var tmpPump = new Pump({
            newId: index,
            tubelength: 1000,
        });
        tmpPump.$save(function(pmp, putResponseHeaders) {
             $scope.pumps.push(pmp);
        });

    };

    $scope.updatePump = function(pump) {
        var pumpToUpdate = new Pump(pump);
        pumpToUpdate.$update();
        for(p in $scope.pumps){
            if($scope.pumps[p] != pump && $scope.pumps[p].ingredient && $scope.pumps[p].ingredient.id == pump.ingredient.id){
                $scope.pumps[p].ingredient = null;
                var pumpToUpdate = new Pump($scope.pumps[p]);
                pumpToUpdate.$update();
            }
        }
    }

	$scope.deletePump = function() {
	    var lastIndex = $scope.pumps.length;
	    if(lastIndex > 0) {
	        var pump_to_delete = $scope.pumps[lastIndex -1]
	        pump_to_delete.$delete();
	        $scope.pumps.splice(lastIndex-1, 1);
	    }
	}

    $scope.togglePump = function (pump) {
        if($scope.pumpstate[pump.id] == undefined || !$scope.pumpstate[pump.id]){
            startPump(pump.id);
            $scope.pumpstate[pump.id] = true;
        } else {
            stopPump(pump.id);
            $scope.pumpstate[pump.id] = false;
        }
    }

    $scope.isMajorityOff = function () {
        if ($scope.pumpstate.length < ($scope.pumps.length/2)){
            return true;
        }

        var pumpsOn = 0;
        for(state in $scope.pumpstate){
            if($scope.pumpstate[state])
                pumpsOn++;
        }

        if (pumpsOn >= ($scope.pumps.length/2)){
            return false;
        } else {
            return true;
        }
    }

    $scope.toggleAllPumps = function (pump) {
        if($scope.isMajorityOff()){
            for(var i = 0; i < $scope.pumps.length; i++) {
                var currentPump = $scope.pumps[i];
                startPump(currentPump.id);
                $scope.pumpstate[currentPump.id] = true;
            }
        } else {
            for(var i = 0; i < $scope.pumps.length; i++) {
                var currentPump = $scope.pumps[i];
                stopPump(currentPump.id);
                $scope.pumpstate[currentPump.id] = false;
            }
        }
    }

    $scope.fillPump = function (pump) {
        startPumpTimed(pump.id, pump.tubeLength);
    }

    $scope.fillAllPumps = function () {
        for(var i = 0; i < $scope.pumps.length; i++) {
            var currentPump = $scope.pumps[i];
            startPumpTimed(currentPump.id, currentPump.tubeLength);
        }
    }

	$scope.getPumps(); //Run this at startup to fill the table
});

