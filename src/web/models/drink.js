class Drink {
  constructor(id, name, description = '', image = '', recipeParts = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.recipeParts = recipeParts;
  }
}

export default Drink;
