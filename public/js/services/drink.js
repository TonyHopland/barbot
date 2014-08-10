angular.module('barbot')
    .factory('Drink', function ($resource) {
        var drink = {};
        drink.selectedDrink = null;


        drink.getNormalFactor = function(){
            var sum = 0;
            for(var i in drink.selectedDrink.recipeparts){
                sum += drink.selectedDrink.recipeparts[i].amount;
            }
            return 100/sum;
        }

        drink.getGlassCss = function (part) {

            var bgColor = part.ingredient ? part.ingredient.color : 'transparent';

            return {
                height: part.amount * drink.getNormalFactor() + "%",
                background_color: bgColor
            }
        }

        drink.getIngredientCss = function (part) {
            return {
                'color': part.ingredient.color
            }
        }

        drink.updateDrinkPart = function (part) {
            if(!drink.selectedDrink)
                return;

            for(var i in drink.selectedDrink.recipeparts){
                if(drink.selectedDrink.recipeparts[i].id == part.id){
                    drink.selectedDrink.recipeparts[i] = part;
                    return;
                }
            }
        }

        return drink;
    });