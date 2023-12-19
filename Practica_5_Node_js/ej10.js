function Libro(titulo, autor, anoPublicacion) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacion = anoPublicacion;
}

Libro.prototype.mostrarAutor = function () {
    console.log(`Este libro es de ${this.autor}`);
};

Libro.prototype.mostrarDetalles = function () {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Año de publicación: ${this.anoPublicacion}`);
};

var miLibro = new Libro("Juego de Tronos", "R.R. Martin", 1996);

miLibro.mostrarAutor();

miLibro.mostrarDetalles();
