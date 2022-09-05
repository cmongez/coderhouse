const Container = require('./clases.js');

const main = async () => {
  //creamos la instancia de la clase container
  const products = new Container('products.txt');
  
  //Añadimos los productos
  let product1 = await products.save({
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  });
  let product2 = await products.save({
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
  });
  let product3 = await products.save({
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
  });

  //Buscamos producto por id 3
  let productById = await products.getByID(3);
  console.log('Producto:', productById);

  // //Eliminamos el producto con id 2
  // let deleteProduct = await products.deleteById(2);

  //Traemos todos los productos
  let allProducts = await products.getAll();
  console.log('Todos los productos');
  console.log(allProducts);

  //Eliminamos el archivo con los productos.
  // console.log('Eliminamos todos los productos')
  // let deleteAll = await products.deleteAll();
};
main();
