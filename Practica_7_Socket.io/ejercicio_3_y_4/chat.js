document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const mensajesUl = document.getElementById("mensajes");
  const mensajeInput = document.getElementById("mensajeInput");
  const enviarBtn = document.getElementById("enviarBtn");
  const usuariosConectadosDiv = document.getElementById("usuariosConectados");

  let nombreUsuario;

  do {
    nombreUsuario = prompt("Ingresa tu nombre de usuario:");
  } while (!nombreUsuario);

  socket.emit("nuevoUsuario", nombreUsuario);

  socket.on("mensajeServidor", (mensaje) => {
    mostrarMensaje(mensaje);
  });

  socket.on("usuariosConectados", (usuarios) => {
    mostrarUsuariosConectados(usuarios);
  });

  enviarBtn.addEventListener("click", () => {
    const mensaje = mensajeInput.value.trim();

    if (mensaje !== "") {
      socket.emit("mensajeCliente", mensaje);
      mensajeInput.value = "";
    }
  });

  function mostrarMensaje(mensaje) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(mensaje));
    mensajesUl.appendChild(li);
  }

  function mostrarUsuariosConectados(usuarios) {
    usuariosConectadosDiv.innerHTML = `Usuarios conectados: ${usuarios.join(
      ", "
    )}`;
  }
});
