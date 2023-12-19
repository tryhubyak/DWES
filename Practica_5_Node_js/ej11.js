function crearRectangulo(base, altura) {
    this.base = base;
    this.altura = altura;

    this.area = function () {
        return this.base * this.altura;
    };
}

var miRectangulo = new crearRectangulo(3, 4);

console.log("El area del rectangulo:", miRectangulo.area());

