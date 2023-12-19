function Libro(titulo, autor, anoPublicacion) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacion = anoPublicacion;
}

Libro.prototype.mostrarDetalles = function () {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Ano de publicación: ${this.anoPublicacion}`);
};

var miLibro = new Libro("Juego de Tronos", "R.R. Martin", 1996);

miLibro.mostrarDetalles();
