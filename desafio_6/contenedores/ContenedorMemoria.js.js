class ContenedorMemoria {
  constructor() {
    this.elementos = [
      {
        title: 'Escuadra',
        price: 123.45,
        thumbnail:
          'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1,
      },
      {
        title: 'Calculadora',
        price: 234.56,
        thumbnail:
          'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2,
      },
      {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail:
          'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3,
      },
    ];
    this.id = 0;
  }
  getById(id) {
    console.log(typeof id);
    let prod = this.elementos.find((p) => p.id == id);
    console.log(prod);

    return prod === undefined ? { error: 'Product does not exist.' } : prod;
  }

  getAll() {
    return this.elementos;
  }

  save(prod) {
    prod.id = this.id;
    this.elementos.push(prod);
    this.id++;
    return prod;
  }

  update(prod, id) {
    let productIndex = this.elementos.findIndex((p) => p.id == id);
    console.log('id', productIndex);

    this.elementos[productIndex] = prod;

    return prod;
  }

  delete(id) {
    this.elementos = this.elementos.filter((p) => p.id != id);
    return this.elementos;
  }
  deleteAll() {
    this.elementos = [];
    return this.elementos;
  }
}
module.exports = ContenedorMemoria;
