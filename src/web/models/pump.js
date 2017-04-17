class Pump {
  constructor(id, msPerCl, ingredientId = -1) {
    this.id = id;
    this.msPerCl = msPerCl;
    this.ingredientId = ingredientId;
  }
}

export default Pump;
