const express = require('express');
const app = express();
const { Router } = express;
const ProductsApi = require('./api/productos.js');
const productosRouter = new Router();

const productsApi = new ProductsApi();

productosRouter.get('/', (req, res) => {
  res.send(productsApi.getAll());
});
productosRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(productsApi.getById(id));
});
productosRouter.post('/', (req, res) => {
  const { prod } = req.body;
  res.send(productsApi.save(prod));
});
productosRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(productsApi.delete(id));
});
productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

app.use('/api/products', productosRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
