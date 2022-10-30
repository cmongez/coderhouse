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
  const newDate = new Date().toLocaleString();

  const mensaje = {
    author: inputUsername.value,
    message: inputMensaje.value,
    date: newDate,
  };

  socket.emit('add-message', mensaje);
  //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socket.on('mensajes', async (mensajes) => {
  const html = await makeHtmlList(mensajes);

  document.getElementById('mensajes').innerHTML = html;
});

function makeHtmlList(mensajes) {
  const prueb = mensajes.map((elem) => {
    return `<div><span class="text-primary font-weight-bold">${elem.author} </span><span class="text-danger">[${elem.date}] :</span><span class="text-success font-italic"> ${elem.message}</span></div>`;
  });

  return prueb.join('');
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
