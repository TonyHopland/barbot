// public/js/controllers/RecipeController.js
angular.module('barbot').controller('SizeController', function($scope, $timeout, Size) {

    $scope.sizes = [];

    Size.query(function(response) {
        $scope.sizes = response;
    });

    var isAddingSize = false;
    $scope.addSize = function () {
        var index = 0;

        if(isAddingSize) {return;}

        index = $scope.sizes.length+1;
        var tmpSize = new Size({
            newId: index,
            name: "Size" + (index),
            cl: 4
        });
        isAddingSize = true;
        tmpSize.$save(function(size, putResponseHeaders) {
             $scope.sizes.push(size);
             isAddingSize = false;
        });

    };

    $scope.updateSize = function(size) {
        var sizeToUpdate = new Size(size);
        sizeToUpdate.$update();
    }

	$scope.deleteSize = function(size) {
	    var lastIndex = $scope.sizes.length;
	    if(lastIndex > 0) {
	        var size_to_delete = $scope.sizes[lastIndex -1]
	        size_to_delete.$delete();
	        $scope.sizes.splice(lastIndex-1, 1);
	    }
	}

});

