function Libro(titulo, autor, anoPublicacion) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacion = anoPublicacion;

    Libro.librosTotal++;
}

Libro.librosTotal = 0;

Libro.totalLibros = function () {
    return Libro.librosTotal;
};

Libro.prototype.mostrarDetalles = function () {
    console.log(`Título: ${this.titulo}, Autor: ${this.autor}, Ano de publicación: ${this.anoPublicacion}`);
};

var libro1 = new Libro("Juego de Tronos", "R.R. Martin", 1996);
var libro2 = new Libro("Choque de Reyes", "R.R. Martin", 1998);
var libro3 = new Libro("Tormenta de Espadas", "R.R. Martin", 2000);
var libro4 = new Libro("Festin de Cuervos", "R.R. Martin", 2005);
var libro5 = new Libro("Danza de Dragones", "R.R. Martin", 2011);

libro1.mostrarDetalles();
libro2.mostrarDetalles();
libro3.mostrarDetalles();
libro4.mostrarDetalles();
libro5.mostrarDetalles();

console.log("El total de libros es de: ", Libro.totalLibros());
