// public/js/controllers/RecipeController.js
angular.module('barbot').controller('MakeController', function($scope, $timeout, $http, Drink, Size, notifier) {

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


    $scope.createDrink = function() {
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

        var makeIds = {drinkId: drink.id, sizeId: $scope.selectedSize.id};

        $http.put('api/createDrink/',makeIds)
            .then(function(response) {
                var data = response.data;
                animateDrinkTime(data.dispensingTime);
                if(data.lowIngredients && data.lowIngredients.length > 0){
                    var notifyText = "<h2>Barbot is running low on the following ingredients: </h2>"
                    for(var i in data.lowIngredients) {
                        notifyText += "<br/><b>"+ data.lowIngredients[i] + "</b>";
                    }
                    notifier.notify({
                        template: notifyText,
                        hasDelay: true,
                        delay: 10000,
                        type: 'default',
                        position: 'top center'
                    });
                }
            }).catch(function(response) {
                alert(response.data);
            })

        console.log("Making: '" + drink.name);
    }

    var animateDrinkTime = function (time) {
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
        $timeout(function () {
                             $scope.progressCss={};
                         }, time + 500);
    };

});

