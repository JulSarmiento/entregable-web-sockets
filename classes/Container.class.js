class Container {
  constructor(products = []){
    this.products = products;
  };

  saveProduct(product) {
    product.id = this.products.length > 0 ? this.products[this.products.length -1 ].id + 1 : 1;
    this.products.push(product);
    console.log('Product id: ', product.id)
    return product.id
  };

  getProducts() {
    return this.products
  };

  getById(id) {
    return this.products.find(product => product.id == id);
  }

  getRandom(){
    const random = Math.round(Math.random() * this.products.length);
    return this.getById(random);
  }

  updateProduct(productId, data) {
    const current = this.getById(productId);
    const currentIndex = this.products.indexOf(current);
    this.products[currentIndex] = {...current, ...data};
    return this.products[currentIndex];
  };

  deleteAll() {
    return this.products = [];
  };

  deleteById(id) {
    this.products = this.products.filter(product => product.id != id);
    return this.products
  }
}

module.exports = Container