// public/js/controllers/RecipeController.js
angular.module('barbot').controller('MakeController', function($scope, $timeout, Drink, Size) {

    Size.query(function(response) {
        $scope.drinkSizes = response;
    });

    $scope.drink = Drink;
    $scope.selectedSize;
	$scope.progressCss = {};

	$scope.selectSize = function(size) {
	    var drink = Drink.selectedDrink;
        if(drink == undefined) {
            $scope.selectedSize = size;
        }else if(drink.maxsize >= size.id) {
            $scope.selectedSize = size;
        }
	}

    $scope.getProgressCss = function () {
        return {
            'animation': 'expand 5s'
        }
    }


    var makingDrink = false;
    $scope.createDrink = function() {
        if(makingDrink){
            alert("Please wait for current drink to finish");
            return;
        }
        var drink = Drink.selectedDrink;
        if(drink == undefined){
            alert("Please select a drink");
            return;
        }

        if($scope.selectedSize != undefined && drink.maxsize < $scope.selectedSize.id){
            $scope.selectedSize = undefined;
        }
        if($scope.selectedSize == undefined){
            alert("Please select a size");
            return;
        }

        dispenseDrink(drink.id, $scope.selectedSize.id);
        makingDrink = true;
        console.log("Making: '" + drink.name);
    }

    socket.on('DispensingTime', function (time) {
        console.log('Time to dispanse: '+ time);
        $scope.progressCss = {
            '-webkit-animation-name': 'expand',
            '-webkit-animation-duration': time +'ms',
            '-webkit-animation-timing-function': 'linear',
            '-webkit-animation-fill-mode': 'forwards',
            /* Standard syntax */
            'animation-name': 'expand',
            'animation-duration': time +'ms',
            'animation-timing-function': 'linear',
            'animation-fill-mode': 'forwards'
        }
        $scope.$apply();
        $timeout(function () {
                             $scope.progressCss={};
                             makingDrink = false;
                         }, time + 500);
    });

});

