# Como generar una API en symfony

## 1. Creacion de esqueleto
Siguiendo lo que hemos hecho en la practica anterior debemos de crear el esqueleto de symfony para poder trabajar, para ello dentro de la carpeta raiz, symfony, desde terminal ejecutamos el siguiente comando:
```
composer create-project symfony/skeleton .
```
Con eso se nos generara la siguiente estructura que se puede ver en la captura:

![image](https://github.com/tryhubyak/DWES/assets/145651101/6c7244a0-7057-4ee0-b838-5f7697a58c74)

Ahora necesitariamos unos cuantos componentes para nuestra api, para ello igual que el esqueleto, vamos a carpeta raiz, symfony, desde terminal y ejecutamos los siguientes comandos uno por uno:
```
$ composer require annotations
$ composer require logger
$ composer require symfony/orm-pack - - with - all - dependencies
$ composer require symfony/maker-bundle --dev
$ composer require friendsofsymfony/rest-bundle
$ composer require symfony/validator twig doctrine/annotations
```
Una vez hecho esto vamos al siguiente paso que sera crear tablas para la base de datos que vamos a utilizar.


## 2. Creacion de las tablas en la BD
Para crear las tablas en la carpeta raiz ejecutaremos el siguiente comando:
```
$ bin/console make:entity "nombre de la tabla"
```
En nuestro caso hemos creado 2 tablas(entidades) una llamada Estudiante y otra Profesor.

Cuando le das a enter despues de ese comando te permite añadir atributos y configurarlos, por ejemplo al Estudiante le añadimos atributo "nombre" de tipo string de varchar 255(predeterminado) y que NO sea nulo. Asi con todos los atributos que queramos añadir, le podemos cambiar de tipo y si queremos que sea nulo o no. Como creamos 2 entidades cada uno tendra sus atributos. Aqui tambien muestro una captura de como se ven las entidades al crearlas:

Estudiante

![image](https://github.com/tryhubyak/DWES/assets/145651101/7b7a1a4b-ebb7-4b76-9299-cc9944ef086d)

Profesor
![image](https://github.com/tryhubyak/DWES/assets/145651101/bdf3c89d-8662-4334-8ef2-c005a6fe2aa3)

Despues de crear las entidades hay que crear migraciones a la base de datos, como se puede observar en las capturas al terminar de crear una entidad ya te dice el comando que tienes que usar para migrar los datos. Los comandos son estos:
```
php bin/console make:migration
pho bin/console doctrine:migrations:migrate
```

Una vez migradas las tablas en la carpeta del proyecto se generaran carpetas y la estructura sera la siguiente:

![image](https://github.com/tryhubyak/DWES/assets/145651101/5d4982fb-7e32-40bd-840b-2d81f10bfc37) 
![image](https://github.com/tryhubyak/DWES/assets/145651101/736416a2-b274-4f21-9305-a365c9708bab)
![image](https://github.com/tryhubyak/DWES/assets/145651101/d033679e-ca38-41f0-b468-d5138aee9b68)

Como podemos ver las nuevas carpetas son la carpeta migrations y las carpetas controller, entity y repository dentro de src. Y precisamente vamos a trabajar dentro de la carpeta src ya que ahi contiene los objetos de las tablas que se crean automaticamente. Lo que yo creo manualmente son los archivos "EstudianteController.php" y "ProfesorController.php"

## 3. Crear los controladores para la API
Los archivos "EstudianteController.php" y "ProfesorController.php" son los que albergan el codigo con el que funcionara nuestra API. Creamos funciones para crear, mostrar, modificar y borrar para cada tabla. Estas funciones usaran metodos POST, GET, PUT y DELETE (el codigo esta comentado de tal manera que se entiende cual es cual).

Estas funciones haran las llamadas a la base de datos que yo necesite y como eejemplo adjunto capturas de postman de como seria crear un objeto estudiante, incertarlo en la tabla, mostrarlo y despues eliminarlo:

POST

![image](https://github.com/tryhubyak/DWES/assets/145651101/32a72ace-e4ba-4a2c-a541-d7abcc028e22)

GET

![image](https://github.com/tryhubyak/DWES/assets/145651101/2c5a5749-b0b7-476f-9513-5f9bf34e5e06)

PUT

![image](https://github.com/tryhubyak/DWES/assets/145651101/e52d8d48-00c8-4c63-9c02-9db07a80007e)

DELETE

![image](https://github.com/tryhubyak/DWES/assets/145651101/f45974bd-e0fb-46a4-81cf-0e21864f9aee)

En la tabla profesores estan habilitados los mismos metodos, tambien esta incluida la validacion y comprobacion si existe el id ingresado, etc.

### Hecho por Veronika Tryhubyak









