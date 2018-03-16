class Drink {
  constructor(id, name, description = '', image = '', recipeParts = [], maxSize = -1) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.recipeParts = recipeParts;
    this.maxSize = maxSize;
  }
}

export default Drink;
