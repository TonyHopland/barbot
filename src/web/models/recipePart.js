class RecipePart {
  constructor(id, ingredient, amount, order = 0, delay = 0) {
    this.id = id;
    this.ingredient = ingredient;
    this.amount = amount;
    this.order = order;
    this.delay = delay;
  }
}

export default RecipePart;
