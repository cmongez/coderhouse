const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js');

const app = express();

//--------------------------------------------
// instancio servidor, socket y api
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const products = new ContenedorMemoria();
const messages = new ContenedorArchivo('mensajes.txt');

//--------------------------------------------
// configuro el socket

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');
  //productos
  const productos = products.getAll();

  //Envia el historial de productos a quien se conecte
  socket.emit('productos', productos);

  //Evento agrega un nuevo producto al array
  socket.on('add-product', (producto) => {
    products.save(producto);

    //avisa a todos los clientes que el array ha sido actualizado y se lo envia

    io.sockets.emit('productos', productos);
  });

  const mensajes = await messages.getAll();

  //Envia el historial de productos a quien se conecte
  socket.emit('mensajes', await mensajes);

  //Evento agrega un nuevo mensaje al array
  socket.on('add-message', async (mensaje) => {
    await messages.save(mensaje);
    const newMessages = await messages.getAll();

    io.sockets.emit('mensajes', newMessages);
  });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//--------------------------------------------
// inicio el servidor

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);
