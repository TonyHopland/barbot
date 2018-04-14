
import dbProxy from '../proxies/dbProxy';
// import hardware from './pumpHardware';

const getNormalFactor = drink =>
  100 / drink.recipeparts.reduce(
    (sum, currentPart) => sum + currentPart.amount,
    0,
  );


const getUsage = (drink, size) => {
  const normalFactor = getNormalFactor(drink);
  const sizeFactor = size.cl / 100;

  return drink.recipeparts.map((recipepart) => {
    const cl = (recipepart.amount * normalFactor) * sizeFactor;
    return {
      cl,
      remaining: recipepart.ingredient.pump == null
        ? recipepart.ingredient.cl
        : recipepart.ingredient.cl - cl,
      ingredient: recipepart.ingredient.name,
      ingredientId: recipepart.ingredient.id,
    };
  });
};

const createDrinkInstructions = (drink, size) => {
  const normalFactor = getNormalFactor(drink);
  const sizeFactor = size.cl / 100;
  return drink.recipeparts.map((recipepart) => {
    const cl = (recipepart.amount * normalFactor) * sizeFactor;
    return {
      cl,
      time: recipepart.ingredient.pump == null ? '0' : cl * recipepart.ingredient.pump.msPerCl,
      order: recipepart.order,
      startdelay: recipepart.startdelay,
      pump: recipepart.ingredient.pump == null ? '-1' : recipepart.ingredient.pump.id,
      ingredient: recipepart.ingredient.name,
      ingredientId: recipepart.ingredient.id,
    };
  });
};

export const createDrink = (req, res) => {
  const { drinkId, sizeId } = req.body;

  const sizePromise = dbProxy.getSizeById(sizeId);
  const drinkPromise = dbProxy.getRecipeById(drinkId);

  Promise.all([drinkPromise, sizePromise]).then((values) => {
    const drink = values[0];
    const size = values[1];

    const instructions = createDrinkInstructions(drink, size);
    const usage = getUsage(drink, size);

    console.log(instructions);
    console.log(usage);

    // TODO: make the drink
  }, (error) => {
    res.status(400).send(`Unable to find selected drink or size: ${error}`);
  });

  //       .then((drink) => {
  //         const instructions = createDrinkInstructions(drink, size);
  //         const usage = getUsage(drink, size);
  //         const totalTime = hardware.dispenseDrink(drink.name, instructions);
  //         if (totalTime > 0) {
  //           const lowIngredients = [];
  //           for (const i in usage) {
  //             ingredientService.subtractCl(usage[i].IngredientId, usage[i].cl);
  //             if (usage[i].remaining < 15) {
  //               lowIngredients.push(usage[i].Ingredient);
  //             }
  //           }
  //           res.json({ dispensingTime: totalTime, lowIngredients });
  //         } else {
  //           res.status(400).send('Please wait for barbot to finish before making a drink.');
  //         }
  //       })
  //       .catch(() => {
  //         res.status(400).send('Ingen drink valgt');
  //       });
  //   })
  //   .catch(() => {
  //     res.status(400).send('Ingen st�rrelse valgt');
  //   });
};

export default { createDrink };
