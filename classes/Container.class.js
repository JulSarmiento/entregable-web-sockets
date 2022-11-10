const readFiles = require("../utilities/readFile");
const saveFiles = require("../utilities/saveFiles");

class Container {
  constructor(products) {
    this.filename = `db/${products}.txt`;
  }

  async saveProduct(product) {
    const values = await this.getAll();
   
    try {
      saveFiles(this.filename, [...values, product]);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const products = await readFiles(this.filename);
      console.log("products array in constructor", products);
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Container;
