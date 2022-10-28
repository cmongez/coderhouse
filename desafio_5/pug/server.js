const express = require('express');
const app = express();

const ProductsApi = require('./api/productos.js');
const productsApi = new ProductsApi();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set engine
const pug = require('pug');

app.set('view engine', 'pug');
app.set('views', './views');
//Set routes

app.get('/', (req, res) => {
  const products = productsApi.getAll();
  res.render('index.pug');
});

app.get('/products', (req, res) => {
  const products = productsApi.getAll();
  const prodExist = products.length > 0;
  res.render('partials/products', { prodExist, products });
});
app.post('/products', (req, res) => {
  console.log(req.body);
  productsApi.save(req.body);
  res.redirect('/products');
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${server.address().port}.`
  );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
