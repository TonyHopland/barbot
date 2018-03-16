class RecipePart {
  constructor(id, ingredientId, amount, order = 0, delay = 0) {
    this.id = id;
    this.ingredientId = ingredientId;
    this.amount = amount;
    this.order = order;
    this.delay = delay;
  }
}

export default RecipePart;
