document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const mensajesUl = document.getElementById("mensajes");
  const mensajeInput = document.getElementById("mensajeInput");
  const enviarBtn = document.getElementById("enviarBtn");

  socket.on("mensaje", (mensaje) => {
    console.log(mensaje);
  });

  socket.on("mensajeServidor", (mensaje) => {
    mostrarMensaje(mensaje);
  });

  enviarBtn.addEventListener("click", () => {
    const mensaje = mensajeInput.value.trim();

    if (mensaje !== "") {
      socket.emit("mensajeCliente", mensaje);
      mostrarMensaje(`Yo: ${mensaje}`);
      mensajeInput.value = "";
    }
  });

  function mostrarMensaje(mensaje) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(mensaje));
    mensajesUl.appendChild(li);
  }
});
