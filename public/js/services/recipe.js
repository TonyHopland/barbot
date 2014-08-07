angular.module('barbot')
	.factory('Recipe', function ($resource) {

	    var selectedDrink = null;

        var drinkWatchers = [];

		var recipeFactory =  $resource('api/recipes/:recipeId', {
		  recipeId: '@id'
		}, {
		  update: {
			method: 'PUT'
		  }
		});



		recipeFactory.getSelectedDrink = function(){return selectedDrink;};

		recipeFactory.setSelectedDrink = function(drink){
		    selectedDrink = drink;
		    for(watcher in drinkWatchers){
		        drinkWatchers[watcher](selectedDrink);
		    }
		}
		recipeFactory.registerWatcher = function(watcher){
		    drinkWatchers.push(watcher);
		}
		recipeFactory.unregisterWatcher = function(watcher){
            var index = drinkWatchers.indexOf(watcher);
            if (index > -1) {
                drinkWatchers.splice(index, 1);
            }
		}


		return recipeFactory;
	  });