var db = require('./db.js');

var ingredients =
[
    {
        "id": 1,
        "name": "Baileys",
        "color": "#E4C7A3"
    },
    {
        "id": 2,
        "name": "Cola",
        "color": "#000000"
    },
    {
        "id": 3,
        "name": "Cranberry juice",
        "color": "#9d0000"
    },
    {
        "id": 4,
        "name": "Grenadine",
        "color": "#f12736"
    },
    {
        "id": 5,
        "name": "Jagermeister",
        "color": "#140A00"
    },
    {
        "id": 6,
        "name": "Kahlua",
        "color": "#beaf7c"
    },
    {
        "id": 7,
        "name": "Midori",
        "color": "#00FF00"
    },
    {
        "id": 8,
        "name": "Milk",
        "color": "#ffffff"
    },
    {
        "id": 9,
        "name": "Orange juice",
        "color": "#FFCC00"
    },
    {
        "id": 10,
        "name": "Peachtree",
        "color": "#fff8f0"
    },
    {
        "id": 11,
        "name": "Pineapple juice",
        "color": "#f2d60d"
    },
    {
        "id": 12,
        "name": "Sambuca",
        "color": "#ffffec"
    },
    {
        "id": 13,
        "name": "Sweet & Sour mix",
        "color": "#ffff46"
    },
    {
        "id": 14,
        "name": "Tequila",
        "color": "#f4f4ff"
    },
    {
        "id": 15,
        "name": "Vodka",
        "color": "#CCFFFF"
    }
];


var recipes = [
    {
        "id": 1,
        "name": "Sure føtter",
        "maxsize": 3,
        "image": "surefotter.jpg"
    },
	{
        "id": 2,
        "name": "Monkey brain",
        "maxsize": 1,
        "image": "brain.jpg"
	},
	{	"id": 3,
        "name": "Screwdriver",
        "maxsize": 3,
        "image": "screwdriver.jpg",
    },
	{
		"id": 4,
        "name": "Sex on the Beach",
        "maxsize": 3,
        "image": "sexonthebeach.jpg",
    },
	{
        "id": 5,
        "name": "Alligator",
        "maxsize": 3,
        "image": "alligator.jpg",
    },
	{
        "id": 6,
        "name": "Screwdriver with Color",
        "maxsize": 3,
        "image": "screwdriverwithcolor.jpg",
    },
	{
        "id": 7,
        "name": "Atomic Watermelon",
        "maxsize": 3,
        "image": "atomicwatermelon.jpg",
    },
	{
        "id": 8,
        "name": "Matador",
        "maxsize": 3,
        "image": "matador.jpg",
    },
]

var recipeparts = [
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 1,
		"IngredientId": 15
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 1,
		"IngredientId": 5
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 1,
		"IngredientId": 7
	},
	{
		"amount": 2,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 1,
		"IngredientId": 2
	},
	{
		"amount": 2,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 1,
		"IngredientId": 13
	},
	{
		"amount": 8,
		"order": 1,
		"startdelay": 0,
		"RecipeId": 2,
		"IngredientId": 10
	},
	{
		"amount": 5,
		"order": 2,
		"startdelay": 500,
		"RecipeId": 2,
		"IngredientId": 1
	},
	{
		"amount": 1,
		"order": 3,
		"startdelay": 1500,
		"RecipeId": 2,
		"IngredientId": 4
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 3,
		"IngredientId": 15
	},
	{
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 3,
		"IngredientId": 9
	},
	{
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 15
	},
	{
		"amount": 2,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 10
	},
	{
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 9
	},
	{
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 3
	},
	{
		"amount": 2,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 5,
		"IngredientId": 7
	},
	{
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 5,
		"IngredientId": 9
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 6,
		"IngredientId": 15
	},
	{
		"amount": 3,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 6,
		"IngredientId": 9
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 6,
		"IngredientId": 6
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 7,
		"IngredientId": 7
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 7,
		"IngredientId": 15
	},
	{
		"amount": 1,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 7,
		"IngredientId": 13
	},
	{
		"amount": 2,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 8,
		"IngredientId": 14
	},
	{
		"amount": 5,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 8,
		"IngredientId": 11
	}
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
