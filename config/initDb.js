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
		"_id": "53c85f7d70eb7cd80d957362",
		"amount": 5,
		"order": 2,
		"startdelay": 500,
		"RecipeId": 2,
		"IngredientId": 1
	},
	{
		"_id": "53c85f9e70eb7cd80d957363",
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
		"_id": "53caf1d646053f940174bb01",
		"amount": 2,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 10
	},
	{
		"_id": "53caf1e046053f940174bb02",
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 9
	},
	{
		"_id": "53caf1e846053f940174bb03",
		"amount": 4,
		"order": 0,
		"startdelay": 0,
		"RecipeId": 4,
		"IngredientId": 3
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

/*
[
    {
        "_id": "53caf3ae46053f940174bb06",
        "name": "Matador",
        "maxsize": 3,
        "image": "matador.jpg",
        "__v": 0,
        "recipe": [
            {
                "_id": "53caf3c146053f940174bb07",
                "amount": 2,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "pump": null,
                    "_id": "53caf38346053f940174bb05",
                    "name": "Tequila",
                    "color": "#f4f4ff",
                    "__v": 0,
                    "id": "53caf38346053f940174bb05"
                },
                "id": "53caf3c146053f940174bb07"
            },
            {
                "_id": "53caf3d446053f940174bb08",
                "amount": 5,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "pump": null,
                    "_id": "53caf31b46053f940174bb04",
                    "name": "Pineapple juice",
                    "color": "#f2d60d",
                    "__v": 0,
                    "id": "53caf31b46053f940174bb04"
                },
                "id": "53caf3d446053f940174bb08"
            }
        ],
        "id": "53caf3ae46053f940174bb06"
    },
    {
        "_id": "53d0186673788c5c3fb1fbf6",
        "name": "Screwdriver with Color",
        "maxsize": 3,
        "image": "screwdriverwithcolor.jpg",
        "__v": 0,
        "recipe": [
            {
                "_id": "53d018c873788c5c3fb1fbf7",
                "amount": 1,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c6d95e680526f01663edec",
                    "name": "Vodka",
                    "color": "#CCFFFF",
                    "__v": 0,
                    "pump": {
                        "_id": "53c7cb174827fa30184437e0",
                        "id": 4
                    },
                    "id": "53c6d95e680526f01663edec"
                },
                "id": "53d018c873788c5c3fb1fbf7"
            },
            {
                "_id": "53d018ca73788c5c3fb1fbf8",
                "amount": 3,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c7013c56da39640d74adbd",
                    "name": "Orange juice",
                    "color": "#FFCC00",
                    "__v": 0,
                    "pump": {
                        "_id": "53c70cda92d26e201f882071",
                        "id": 3
                    },
                    "id": "53c7013c56da39640d74adbd"
                },
                "id": "53d018ca73788c5c3fb1fbf8"
            },
            {
                "_id": "53d018ca73788c5c3fb1fbf9",
                "amount": 1,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "pump": null,
                    "_id": "53d0185773788c5c3fb1fbf5",
                    "name": "Kahlua",
                    "color": "#beaf7c",
                    "__v": 0,
                    "id": "53d0185773788c5c3fb1fbf5"
                },
                "id": "53d018ca73788c5c3fb1fbf9"
            }
        ],
        "id": "53d0186673788c5c3fb1fbf6"
    },
    {
        "_id": "53d018ef73788c5c3fb1fbfa",
        "name": "Alligator",
        "maxsize": 3,
        "image": "alligator.jpg",
        "__v": 0,
        "recipe": [
            {
                "_id": "53d0193a73788c5c3fb1fbfb",
                "amount": 2,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c6da87680526f01663edf1",
                    "name": "Midori",
                    "color": "#00FF00",
                    "__v": 0,
                    "pump": {
                        "_id": "53c7cb184827fa30184437e1",
                        "id": 5
                    },
                    "id": "53c6da87680526f01663edf1"
                },
                "id": "53d0193a73788c5c3fb1fbfb"
            },
            {
                "_id": "53d0193a73788c5c3fb1fbfc",
                "amount": 4,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c7013c56da39640d74adbd",
                    "name": "Orange juice",
                    "color": "#FFCC00",
                    "__v": 0,
                    "pump": {
                        "_id": "53c70cda92d26e201f882071",
                        "id": 3
                    },
                    "id": "53c7013c56da39640d74adbd"
                },
                "id": "53d0193a73788c5c3fb1fbfc"
            }
        ],
        "id": "53d018ef73788c5c3fb1fbfa"
    },
    {
        "_id": "53d0194673788c5c3fb1fbfd",
        "name": "Atomic Watermelon",
        "maxsize": 3,
        "image": "atomicwatermelon.jpg",
        "__v": 0,
        "recipe": [
            {
                "_id": "53d0195573788c5c3fb1fbfe",
                "amount": 1,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c6da87680526f01663edf1",
                    "name": "Midori",
                    "color": "#00FF00",
                    "__v": 0,
                    "pump": {
                        "_id": "53c7cb184827fa30184437e1",
                        "id": 5
                    },
                    "id": "53c6da87680526f01663edf1"
                },
                "id": "53d0195573788c5c3fb1fbfe"
            },
            {
                "_id": "53d0195573788c5c3fb1fbff",
                "amount": 1,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c6d95e680526f01663edec",
                    "name": "Vodka",
                    "color": "#CCFFFF",
                    "__v": 0,
                    "pump": {
                        "_id": "53c7cb174827fa30184437e0",
                        "id": 4
                    },
                    "id": "53c6d95e680526f01663edec"
                },
                "id": "53d0195573788c5c3fb1fbff"
            },
            {
                "_id": "53d0195573788c5c3fb1fc00",
                "amount": 1,
                "order": 0,
                "startdelay": 0,
                "__v": 0,
                "ingredient": {
                    "_id": "53c85f3f70eb7cd80d95735f",
                    "name": "Sweet & Sour mix",
                    "color": "#ffff46",
                    "pumps": [],
                    "__v": 0,
                    "pump": {
                        "_id": "53c6f3cf56da39640d74adaf",
                        "id": 0
                    },
                    "id": "53c85f3f70eb7cd80d95735f"
                },
                "id": "53d0195573788c5c3fb1fc00"
            }
        ],
        "id": "53d0194673788c5c3fb1fbfd"
    }
]*/