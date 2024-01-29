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

  socket.on("mensajePrivado", (remitenteNombre, mensaje) => {
    mostrarMensaje(`Mensaje privado de ${remitenteNombre}: ${mensaje}`);
  });

  enviarBtn.addEventListener("click", () => {
    const mensaje = mensajeInput.value.trim();

    if (mensaje !== "") {
      const esMensajePrivado = mensaje.startsWith("@");

      if (esMensajePrivado) {
        const destinatario = mensaje.split(" ")[0].substring(1);
        const mensajePrivado = mensaje.substring(destinatario.length + 2);

        socket.emit("mensajePrivado", destinatario, mensajePrivado);
      } else {
        socket.emit("mensajeCliente", mensaje);
      }
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
