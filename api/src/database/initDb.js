var ingredients = [
{"id":1,"name":"Baileys","color":"#E4C7A3", "cl":100},
{"id":2,"name":"Cola","color":"#000000", "cl":100},
{"id":3,"name":"Cranberry juice","color":"#9d0000", "cl":100},
{"id":4,"name":"Grenadine","color":"#f12736", "cl":100},
{"id":5,"name":"Jagermeister","color":"#140A00", "cl":100},
{"id":6,"name":"Kahlua","color":"#beaf7c", "cl":100},
{"id":7,"name":"Midori","color":"#00FF00", "cl":100},
{"id":8,"name":"Milk","color":"#ffffff", "cl":100},
{"id":9,"name":"Orange juice","color":"#FFCC00", "cl":100},
{"id":10,"name":"Peachtree","color":"#fff8f0", "cl":100},
{"id":11,"name":"Pineapple juice","color":"#f2d60d", "cl":100},
{"id":12,"name":"Sambuca","color":"#ffffec", "cl":100},
{"id":13,"name":"Sweet & Sour mix","color":"#ffff46", "cl":100},
{"id":14,"name":"Tequila","color":"#f4f4ff", "cl":100},
{"id":15,"name":"Vodka","color":"#CCFFFF", "cl":100},
{"id":16,"name":"Gin","color":"#d7ffff", "cl":100},
{"id":17,"name":"Blue Curacao","color":"#090fff", "cl":100},
{"id":18,"name":"Tonic","color":"#f5f5f5", "cl":100}
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
{"id":23,"name":"TestDrink","maxsize":3,"image":""},
]

var recipeparts = [
{"amount":1,"order":0,"startdelay":0,"recipeId":1,"ingredientId":15},
{"amount":1,"order":0,"startdelay":0,"recipeId":1,"ingredientId":5},
{"amount":1,"order":0,"startdelay":0,"recipeId":1,"ingredientId":7},
{"amount":2,"order":0,"startdelay":0,"recipeId":1,"ingredientId":2},
{"amount":2,"order":0,"startdelay":0,"recipeId":1,"ingredientId":13},
{"amount":8,"order":1,"startdelay":0,"recipeId":2,"ingredientId":10},
{"amount":5,"order":2,"startdelay":500,"recipeId":2,"ingredientId":1},
{"amount":1,"order":3,"startdelay":1500,"recipeId":2,"ingredientId":4},
{"amount":1,"order":0,"startdelay":0,"recipeId":3,"ingredientId":15},
{"amount":4,"order":0,"startdelay":0,"recipeId":3,"ingredientId":9},
{"amount":4,"order":0,"startdelay":0,"recipeId":4,"ingredientId":15},
{"amount":2,"order":0,"startdelay":0,"recipeId":4,"ingredientId":10},
{"amount":4,"order":0,"startdelay":0,"recipeId":4,"ingredientId":9},
{"amount":4,"order":0,"startdelay":0,"recipeId":4,"ingredientId":3},
{"amount":2,"order":0,"startdelay":0,"recipeId":5,"ingredientId":7},
{"amount":4,"order":0,"startdelay":0,"recipeId":5,"ingredientId":9},
{"amount":1,"order":0,"startdelay":0,"recipeId":6,"ingredientId":15},
{"amount":3,"order":0,"startdelay":0,"recipeId":6,"ingredientId":9},
{"amount":1,"order":0,"startdelay":0,"recipeId":6,"ingredientId":6},
{"amount":1,"order":0,"startdelay":0,"recipeId":7,"ingredientId":7},
{"amount":1,"order":0,"startdelay":0,"recipeId":7,"ingredientId":15},
{"amount":1,"order":0,"startdelay":0,"recipeId":7,"ingredientId":13},
{"amount":2,"order":0,"startdelay":0,"recipeId":8,"ingredientId":14},
{"amount":5,"order":0,"startdelay":0,"recipeId":8,"ingredientId":11},
{"amount":2,"order":0,"startdelay":0,"recipeId":9,"ingredientId":7},
{"amount":6,"order":0,"startdelay":0,"recipeId":9,"ingredientId":3},
{"amount":2,"order":0,"startdelay":0,"recipeId":10,"ingredientId":3},
{"amount":1,"order":0,"startdelay":0,"recipeId":10,"ingredientId":10},
{"amount":5,"order":0,"startdelay":0,"recipeId":11,"ingredientId":7},
{"amount":5,"order":0,"startdelay":0,"recipeId":11,"ingredientId":9},
{"amount":1,"order":1,"startdelay":0,"recipeId":11,"ingredientId":4},
{"amount":5,"order":0,"startdelay":0,"recipeId":12,"ingredientId":3},
{"amount":0.5,"order":1,"startdelay":0,"recipeId":12,"ingredientId":4},
{"amount":2,"order":0,"startdelay":0,"recipeId":12,"ingredientId":16},
{"amount":1,"order":0,"startdelay":0,"recipeId":13,"ingredientId":7},
{"amount":6,"order":0,"startdelay":0,"recipeId":13,"ingredientId":9},
{"amount":1,"order":0,"startdelay":0,"recipeId":13,"ingredientId":16},
{"amount":1,"order":0,"startdelay":0,"recipeId":14,"ingredientId":7},
{"amount":4,"order":0,"startdelay":0,"recipeId":14,"ingredientId":9},
{"amount":2,"order":0,"startdelay":0,"recipeId":14,"ingredientId":10},
{"amount":4,"order":0,"startdelay":0,"recipeId":15,"ingredientId":9},
{"amount":1.5,"order":0,"startdelay":0,"recipeId":15,"ingredientId":10},
{"amount":4,"order":0,"startdelay":0,"recipeId":16,"ingredientId":3},
{"amount":1.5,"order":0,"startdelay":0,"recipeId":16,"ingredientId":10},
{"amount":1,"order":0,"startdelay":0,"recipeId":17,"ingredientId":7},
{"amount":2,"order":0,"startdelay":0,"recipeId":17,"ingredientId":16},
{"amount":1,"order":0,"startdelay":0,"recipeId":18,"ingredientId":17},
{"amount":1,"order":0,"startdelay":0,"recipeId":18,"ingredientId":10},
{"amount":3,"order":0,"startdelay":0,"recipeId":18,"ingredientId":16},
{"amount":4,"order":0,"startdelay":0,"recipeId":18,"ingredientId":18},
{"amount":2,"order":0,"startdelay":0,"recipeId":19,"ingredientId":16},
{"amount":3,"order":0,"startdelay":0,"recipeId":19,"ingredientId":18},
{"amount":3,"order":0,"startdelay":0,"recipeId":20,"ingredientId":9},
{"amount":2,"order":0,"startdelay":0,"recipeId":20,"ingredientId":17},
{"amount":1,"order":0,"startdelay":0,"recipeId":21,"ingredientId":4},
{"amount":2,"order":0,"startdelay":0,"recipeId":21,"ingredientId":17},
{"amount":5,"order":0,"startdelay":0,"recipeId":22,"ingredientId":9},
{"amount":2,"order":0,"startdelay":0,"recipeId":22,"ingredientId":10},
{"amount":0.5,"order":1,"startdelay":0,"recipeId":22,"ingredientId":4},

{"amount":1,"order":1,"startdelay":700,"recipeId":23,"ingredientId":1},
{"amount":1,"order":2,"startdelay":700,"recipeId":23,"ingredientId":2},
{"amount":1,"order":3,"startdelay":700,"recipeId":23,"ingredientId":3},
{"amount":1,"order":4,"startdelay":700,"recipeId":23,"ingredientId":4},
{"amount":1,"order":5,"startdelay":700,"recipeId":23,"ingredientId":5},
{"amount":1,"order":6,"startdelay":700,"recipeId":23,"ingredientId":6},
{"amount":1,"order":7,"startdelay":700,"recipeId":23,"ingredientId":7},
{"amount":1,"order":8,"startdelay":700,"recipeId":23,"ingredientId":8},
{"amount":1,"order":9,"startdelay":700,"recipeId":23,"ingredientId":9},
{"amount":1,"order":10,"startdelay":700,"recipeId":23,"ingredientId":10},
{"amount":1,"order":11,"startdelay":700,"recipeId":23,"ingredientId":11},
{"amount":1,"order":12,"startdelay":700,"recipeId":23,"ingredientId":12},
{"amount":1,"order":13,"startdelay":700,"recipeId":23,"ingredientId":13},
{"amount":1,"order":14,"startdelay":700,"recipeId":23,"ingredientId":14},
{"amount":1,"order":15,"startdelay":700,"recipeId":23,"ingredientId":15},
{"amount":1,"order":16,"startdelay":700,"recipeId":23,"ingredientId":16},
{"amount":1,"order":17,"startdelay":700,"recipeId":23,"ingredientId":17},
{"amount":1,"order":18,"startdelay":700,"recipeId":23,"ingredientId":18},
]

var pumps = [
	{"msPerCl":5000, "ingredientId":1},
	{"msPerCl":5000, "ingredientId":2},
	{"msPerCl":5000, "ingredientId":3},
	{"msPerCl":5000, "ingredientId":4},
	{"msPerCl":5000, "ingredientId":5},
	{"msPerCl":5000, "ingredientId":6},
	{"msPerCl":5000, "ingredientId":7},
	{"msPerCl":5000},
];

export default (database) => {	
	for (var ing in ingredients){	
		database.ingredient
			.create(ingredients[ing]);
	}
	for (var res in recipes){
		database.recipe
			.create(recipes[res]);
	}
	for (var rp in recipeparts){
		database.recipepart
			.create(recipeparts[rp]);
	}
	for (var pu in pumps){
		database.pump
			.create(pumps[pu]);
	}
}
