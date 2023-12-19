function Libro(titulo, autor){
    this.titulo = titulo;
    this.autor = autor;
}

Libro.prototype.mostrarDetalles = function () {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}`);
};

var Libro = new Libro("Juego de Tronos", "R.R.Martin");

Libro.mostrarDetalles();