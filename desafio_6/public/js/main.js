const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto');
formAgregarProducto.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('nombre').value;
  const price = document.getElementById('precio').value;
  const thumbnail = document.getElementById('foto').value;
  const producto = { price, thumbnail, title };
  socket.emit('add-product', producto);
  //Armar objeto producto y emitir mensaje a evento update
});

socket.on('productos', async (productos) => {
  //generar el html y colocarlo en el tag productos llamando a la funcion makeHtmlTable
  console.log(productos);

  const prueba = await makeHtmlTable(productos);
  document.getElementById('productos').innerHTML = prueba;
});

function makeHtmlTable(productos) {
  return fetch('plantillas/tabla-productos.hbs')
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername');
const inputMensaje = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const formPublicarMensaje = document.getElementById('formPublicarMensaje');
formPublicarMensaje.addEventListener('submit', (e) => {
  e.preventDefault();
  //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socket.on('mensajes', async (mensajes) => {
  console.log(mensajes);
  const html = await makeHtmlList(mensajes);
  document.getElementById('mensajes').innerHTML = html;
});

function makeHtmlList(mensajes) {
  //Armar nuestro html para mostrar los mensajes como lo hicimos en clase
}

inputUsername.addEventListener('input', () => {
  const hayEmail = inputUsername.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener('input', () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});
