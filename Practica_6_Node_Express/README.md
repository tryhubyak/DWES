# Practica 6 - API restful Node Express

Para preparar la instalación de Node Express, vamos a necesitar los siguientes comandos y preparar el entorno con Dockerfile y docker-compose.yml.

Los comandos que necesitamos son:

- `npm install express --save` => instala los módulos de Node
- `npm i mysql2` => conexión a MySQL
- `npm i nodemon dotenv --save-dev` => lee los archivos .env

Tambien para ejecutar dockerfile y docker-compose usariamos los siguientes comandos:
- `docker build -t node` => dockerfile
- `docker-compose up -d` => docker-compose.yml

Ahora en cuanto a nuestro proyecto, todo eso está en un src, dentro de src tendremos la siguiente estructura de carpetas:
![image](https://github.com/tryhubyak/DWES/assets/145651101/ca7622cd-963e-4c0a-ae6e-b2aaefde1b64)

- Node modules: los cuales se han instalado con el primer comando que se mencionó antes.
- Routes: nos hará falta para programar ya lo que serían las funciones CRUD.
- App e index que son importantes para la funcionalidad del proyecto

Profesores y alumnos tienen implementado el codigo que supone el CRUD.
