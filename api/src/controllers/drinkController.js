/* eslint-disable */ 
// Disabeling as this file is not refactored yet (lots of improvements needed)

const db = require('../../config/db.js');
const hardware = require('./pumpHardware.js');
const ingredientService = require('./ingredient.js');

exports.Init = function (conn) {
  socket = conn;
};

exports.FindDrinks = function (req, res) {
  db.recipe.findAll({
    include: [{ model: db.recipepart }],
  })
    .then((recipe) => {
      res.json(recipe);
    });
};

exports.CreateDrink = function (req, res) {
  const drinkId = req.body.drinkId;
  const sizeId = req.body.sizeId;

  db.size
    .find({ where: { id: sizeId } })
    .then((size) => {
      db.recipe
        .find({ where: { id: drinkId }, include: [{ model: db.recipepart, include: [{ model: db.ingredient, include: [db.pump] }] }] })
        .then((drink) => {
          const instructions = createDrinkInstructions(drink, size);
          const usage = getUsage(drink, size);
          const totalTime = hardware.dispenseDrink(drink.name, instructions);
          if (totalTime > 0) {
            const lowIngredients = [];
            for (const i in usage) {
              ingredientService.subtractCl(usage[i].IngredientId, usage[i].cl);
              if (usage[i].remaining < 15) {
                lowIngredients.push(usage[i].Ingredient);
              }
            }
            res.json({ dispensingTime: totalTime, lowIngredients });
          } else {
            res.status(400).send('Please wait for barbot to finish before making a drink.');
          }
        })
        .catch(() => {
          res.status(400).send('Ingen drink valgt');
        });
    })
    .catch(() => {
      res.status(400).send('Ingen st�rrelse valgt');
    });
};

const getNormalFactor = function (drink) {
  let sum = 0;
  for (const i in drink.Recipeparts) {
    sum += drink.Recipeparts[i].amount;
  }
  return 100 / sum;
};

var getUsage = function (drink, size) {
	 const normalFactor = getNormalFactor(drink);
	 const sizeFactor = size.cl / 100;
	 const usage = [];

	 for (const i in drink.Recipeparts) {
		 if (drink.Recipeparts[i].Ingredient.PumpId) {
			 const cl = (drink.Recipeparts[i].amount * normalFactor) * sizeFactor;
			 usage.push({
					 cl,
					 remaining: drink.Recipeparts[i].Ingredient.cl - cl,
					 ingredient: drink.Recipeparts[i].Ingredient.name,
					 ingredientId: drink.Recipeparts[i].Ingredient.id,
				 });
    }
	 }
	 return usage;
};

var createDrinkInstructions = function (drink, size) {
  const normalFactor = getNormalFactor(drink);
  const sizeFactor = size.cl / 100;
  const drinkInstructions = [];
  for (const i in drink.Recipeparts) {
    const cl = (drink.Recipeparts[i].amount * normalFactor) * sizeFactor;
    drinkInstructions.push({
      cl,
      time: drink.Recipeparts[i].Ingredient.Pump == null ? '0' : cl * drink.Recipeparts[i].Ingredient.Pump.msPerCl,
      order: drink.Recipeparts[i].order,
      startdelay: drink.Recipeparts[i].startdelay,
      pump: drink.Recipeparts[i].Ingredient.PumpId == null ? '-1' : drink.Recipeparts[i].Ingredient.PumpId,
      ingredient: drink.Recipeparts[i].Ingredient.name,
      ingredientId: drink.Recipeparts[i].Ingredient.id,
    });
  }
  return drinkInstructions;
};
