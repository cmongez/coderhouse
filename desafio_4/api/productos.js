class ProductsApi {
  constructor() {
    this.products = [{}, {}];
    this.id = 0;
  }
  getById(id) {
    let prod = this.products.find((elem) => elem.id === id);

    return prod === undefined ? { error: 'Product does not exist.' } : prod;
  }

  getAll() {
    return this.products;
  }

  save(prod) {
    prod.id = this.id;
    this.products.push(prod);
    id++;
    return prod;
  }

  update(prod, id) {
    const product = this.products.find((elem) => elem.id === id);
    product = prod;
  }

  delete(id) {
    this.products = this.products.filter((elem) => elem.id !== id);
    return { msg: 'Product deleted' };
  }
}
module.exports = ProductsApi;
