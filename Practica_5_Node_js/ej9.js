function Libro(titulo, autor, anoPublicacion) {
  this.titulo = titulo;
  this.autor = autor;
  this.anoPublicacion = anoPublicacion;
}

Libro.prototype.mostrarDetalles = function () {
  console.log(
    `Título: ${this.titulo}, Autor: ${this.autor}, Año de publicación: ${this.anoPublicacion}`
  );
};

function Revista(titulo, autor, anoPublicacion, tipo) {
  Libro.call(this, titulo, autor, anoPublicacion);

  this.tipo = tipo;
}

Revista.prototype = Object.create(Libro.prototype);
Revista.prototype.constructor = Revista;

Revista.prototype.mostrarDetallesRevista = function () {
  console.log(
    `Título: ${this.titulo}, Autor: ${this.autor}, Año de publicación: ${this.anoPublicacion}, tipo: ${this.tipo}`
  );
};

var RevistaModa = new Revista(
  "Vogue",
  "autor desconocido",
  2023,
  "Moda"
);

RevistaModa.mostrarDetallesRevista();
