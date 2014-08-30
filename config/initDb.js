var db = require('./db.js');

var ingredients = [
{"id":1,"name":"Baileys","color":"#E4C7A3"},
{"id":2,"name":"Cola","color":"#000000"},
{"id":3,"name":"Cranberry juice","color":"#9d0000"},
{"id":4,"name":"Grenadine","color":"#f12736"},
{"id":5,"name":"Jagermeister","color":"#140A00"},
{"id":6,"name":"Kahlua","color":"#beaf7c"},
{"id":7,"name":"Midori","color":"#00FF00"},
{"id":8,"name":"Milk","color":"#ffffff"},
{"id":9,"name":"Orange juice","color":"#FFCC00"},
{"id":10,"name":"Peachtree","color":"#fff8f0"},
{"id":11,"name":"Pineapple juice","color":"#f2d60d"},
{"id":12,"name":"Sambuca","color":"#ffffec"},
{"id":13,"name":"Sweet & Sour mix","color":"#ffff46"},
{"id":14,"name":"Tequila","color":"#f4f4ff"},
{"id":15,"name":"Vodka","color":"#CCFFFF"},
{"id":16,"name":"Gin","color":"#d7ffff"},
{"id":17,"name":"Blue Curacao","color":"#090fff"},
{"id":18,"name":"Tonic","color":"#f5f5f5"}
]

var recipes = [
{"id":1,"name":"Sure føtter","maxsize":3,"image":"surefotter.jpg"},
{"id":2,"name":"Monkey brain","maxsize":1,"image":"brain.jpg"},
{"id":3,"name":"Screwdriver","maxsize":3,"image":"screwdriver.jpg"},
{"id":4,"name":"Sex on the Beach","maxsize":3,"image":"sexonthebeach.jpg"},
{"id":5,"name":"Alligator","maxsize":3,"image":"alligator.jpg"},
{"id":6,"name":"Screwdriver with Color","maxsize":3,"image":"screwdriverwithcolor.jpg"},
{"id":7,"name":"Atomic Watermelon","maxsize":3,"image":"atomicwatermelon.jpg"},
{"id":8,"name":"Matador","maxsize":3,"image":"matador.jpg"},
{"id":9,"name":"Skinny Dipper","maxsize":3,"image":"SkinnyDipper.jpg"},
{"id":10,"name":"Sailor's Delight","maxsize":3,"image":"sailors-delight.jpg"},
{"id":11,"name":"Midori Sunrise","maxsize":3,"image":"midoriSunrise.jpg"},
{"id":12,"name":"Ruby Tuesday","maxsize":3,"image":""},
{"id":13,"name":"Sun on a Beach","maxsize":3,"image":"sun-of-a-beach.jpg"},
{"id":14,"name":"Tootsy Pop","maxsize":3,"image":""},
{"id":15,"name":"Fuzzy Navel","maxsize":3,"image":"fuzzy_navel.jpg"},
{"id":16,"name":"Fuzzy Berry","maxsize":3,"image":"fuzzy_berry.jpg"},
{"id":17,"name":"Martian Martini","maxsize":3,"image":"martian-martini.jpg"},
{"id":18,"name":"Alp Top","maxsize":3,"image":"alptopp.jpg"},
{"id":19,"name":"Gin and Tonic","maxsize":3,"image":"gin-and-tonic.jpg"},
{"id":20,"name":"Green Widow","maxsize":3,"image":"green_widow.jpg"},
{"id":21,"name":"Purple VW","maxsize":1,"image":"Purple-VW.jpg"},
{"id":22,"name":"Fuzzy Navel Sunrise","maxsize":3,"image":"fuzzy_navel_sun.jpg"},
]

var recipeparts = [
{"amount":1,"order":0,"startdelay":0,"RecipeId":1,"IngredientId":15},
{"amount":1,"order":0,"startdelay":0,"RecipeId":1,"IngredientId":5},
{"amount":1,"order":0,"startdelay":0,"RecipeId":1,"IngredientId":7},
{"amount":2,"order":0,"startdelay":0,"RecipeId":1,"IngredientId":2},
{"amount":2,"order":0,"startdelay":0,"RecipeId":1,"IngredientId":13},
{"amount":8,"order":1,"startdelay":0,"RecipeId":2,"IngredientId":10},
{"amount":5,"order":2,"startdelay":500,"RecipeId":2,"IngredientId":1},
{"amount":1,"order":3,"startdelay":1500,"RecipeId":2,"IngredientId":4},
{"amount":1,"order":0,"startdelay":0,"RecipeId":3,"IngredientId":15},
{"amount":4,"order":0,"startdelay":0,"RecipeId":3,"IngredientId":9},
{"amount":4,"order":0,"startdelay":0,"RecipeId":4,"IngredientId":15},
{"amount":2,"order":0,"startdelay":0,"RecipeId":4,"IngredientId":10},
{"amount":4,"order":0,"startdelay":0,"RecipeId":4,"IngredientId":9},
{"amount":4,"order":0,"startdelay":0,"RecipeId":4,"IngredientId":3},
{"amount":2,"order":0,"startdelay":0,"RecipeId":5,"IngredientId":7},
{"amount":4,"order":0,"startdelay":0,"RecipeId":5,"IngredientId":9},
{"amount":1,"order":0,"startdelay":0,"RecipeId":6,"IngredientId":15},
{"amount":3,"order":0,"startdelay":0,"RecipeId":6,"IngredientId":9},
{"amount":1,"order":0,"startdelay":0,"RecipeId":6,"IngredientId":6},
{"amount":1,"order":0,"startdelay":0,"RecipeId":7,"IngredientId":7},
{"amount":1,"order":0,"startdelay":0,"RecipeId":7,"IngredientId":15},
{"amount":1,"order":0,"startdelay":0,"RecipeId":7,"IngredientId":13},
{"amount":2,"order":0,"startdelay":0,"RecipeId":8,"IngredientId":14},
{"amount":5,"order":0,"startdelay":0,"RecipeId":8,"IngredientId":11},
{"amount":2,"order":0,"startdelay":0,"RecipeId":9,"IngredientId":7},
{"amount":6,"order":0,"startdelay":0,"RecipeId":9,"IngredientId":3},
{"amount":2,"order":0,"startdelay":0,"RecipeId":10,"IngredientId":3},
{"amount":1,"order":0,"startdelay":0,"RecipeId":10,"IngredientId":10},
{"amount":5,"order":0,"startdelay":0,"RecipeId":11,"IngredientId":7},
{"amount":5,"order":0,"startdelay":0,"RecipeId":11,"IngredientId":9},
{"amount":1,"order":1,"startdelay":0,"RecipeId":11,"IngredientId":4},
{"amount":5,"order":0,"startdelay":0,"RecipeId":12,"IngredientId":3},
{"amount":0.5,"order":1,"startdelay":0,"RecipeId":12,"IngredientId":4},
{"amount":2,"order":0,"startdelay":0,"RecipeId":12,"IngredientId":16},
{"amount":1,"order":0,"startdelay":0,"RecipeId":13,"IngredientId":7},
{"amount":6,"order":0,"startdelay":0,"RecipeId":13,"IngredientId":9},
{"amount":1,"order":0,"startdelay":0,"RecipeId":13,"IngredientId":16},
{"amount":1,"order":0,"startdelay":0,"RecipeId":14,"IngredientId":7},
{"amount":4,"order":0,"startdelay":0,"RecipeId":14,"IngredientId":9},
{"amount":2,"order":0,"startdelay":0,"RecipeId":14,"IngredientId":10},
{"amount":4,"order":0,"startdelay":0,"RecipeId":15,"IngredientId":9},
{"amount":1.5,"order":0,"startdelay":0,"RecipeId":15,"IngredientId":10},
{"amount":4,"order":0,"startdelay":0,"RecipeId":16,"IngredientId":3},
{"amount":1.5,"order":0,"startdelay":0,"RecipeId":16,"IngredientId":10},
{"amount":1,"order":0,"startdelay":0,"RecipeId":17,"IngredientId":7},
{"amount":2,"order":0,"startdelay":0,"RecipeId":17,"IngredientId":16},
{"amount":1,"order":0,"startdelay":0,"RecipeId":18,"IngredientId":17},
{"amount":1,"order":0,"startdelay":0,"RecipeId":18,"IngredientId":10},
{"amount":3,"order":0,"startdelay":0,"RecipeId":18,"IngredientId":16},
{"amount":4,"order":0,"startdelay":0,"RecipeId":18,"IngredientId":18},
{"amount":2,"order":0,"startdelay":0,"RecipeId":19,"IngredientId":16},
{"amount":3,"order":0,"startdelay":0,"RecipeId":19,"IngredientId":18},
{"amount":3,"order":0,"startdelay":0,"RecipeId":20,"IngredientId":9},
{"amount":2,"order":0,"startdelay":0,"RecipeId":20,"IngredientId":17},
{"amount":1,"order":0,"startdelay":0,"RecipeId":21,"IngredientId":4},
{"amount":2,"order":0,"startdelay":0,"RecipeId":21,"IngredientId":17},
{"amount":5,"order":0,"startdelay":0,"RecipeId":22,"IngredientId":9},
{"amount":2,"order":0,"startdelay":0,"RecipeId":22,"IngredientId":10},
{"amount":0.5,"order":1,"startdelay":0,"RecipeId":22,"IngredientId":4},
]

for (ing in ingredients){
	db.Ingredient
		.create(ingredients[ing]);
}
for (res in recipes){
	db.Recipe
		.create(recipes[res]);
}
for (rp in recipeparts){
	db.Recipepart
		.create(recipeparts[rp]);
}
