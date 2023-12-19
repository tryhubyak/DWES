class Usuario {
    constructor(nombre, correo, contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    static crearUser(usuario, Usuarios) {
        Usuarios.push(usuario);
    }

    static mostrarInformacion(usuario) {
        console.log(`Nombre: ${usuario.nombre}, Correo: ${usuario.correo}`);
    }

    static convertirAJSON(Usuarios) {
        return JSON.stringify(Usuarios, null, 2);
    }
}

const Usuarios = [];

const usuario1 = new Usuario("Veronika", "veronika@email.com", "12345login");
Usuario.crearUser(usuario1, Usuarios);

const usuario2 = new Usuario("Cristian", "cristian@email.com", "password4321");
Usuario.crearUser(usuario2, Usuarios);


Usuario.mostrarInformacion(usuario1);


const UsuariosJSON = Usuario.convertirAJSON(Usuarios);
console.log("Lista de usuarios (JSON):");
console.log(UsuariosJSON);
