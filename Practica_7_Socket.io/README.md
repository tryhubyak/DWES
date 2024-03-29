# Practica 7 - Socket.io

## Ejercicio 1
Pasos a seguir
- En la carpeta donde iniciamos el proyecto que en mi caso es Practica_7_Socket.io ponemos los siguientes 2 comandos para agregar los modulos de node y de socket

```
npm init -y
npm install express socket.io
```

- Luego creamos un archivo de app.js en el cual añadimos la configuración del servidor, las bibliotecas necesarias, y por ultimo, la respuesta que tendria el servidor que lo veremos reflejado en consola.
- Para finalizar cremos un index.html en el cual metemos un script simple de mensaje de saludo al servidor. Iniciamos el servidor en consola con un:

```
node app.js
```

Aqui las capturas de los resultados:

![image](https://github.com/tryhubyak/DWES/assets/145651101/bb45bf18-47e1-4d5b-b164-6b3f1bd1787f)
![image](https://github.com/tryhubyak/DWES/assets/145651101/3d425aa0-ec9a-4b6c-98ca-926ff0b350ec)

![image](https://github.com/tryhubyak/DWES/assets/145651101/9c4c32d3-47ac-4a0c-a50f-4eab88c51dd6)

Mensaje que aparece al desconectarse el cliente

## Ejercicio 2
Modificamos archivo app.js segun nuestras necesodades, en este caso he creado uno nuevo y los he distribuido por carpetas para cada ejercicio. En este archivo la funcion de servidor ya es resibir mensajes de cliente y luego volver a mostrarlos en la web, por lo tanto en el html se le añade un inpun para que el usuario ingrese el mensaje. 

![image](https://github.com/tryhubyak/DWES/assets/145651101/949dbe18-f02f-45c1-a436-7c5492337e22)

![image](https://github.com/tryhubyak/DWES/assets/145651101/17844619-98f3-4f35-8682-6454cd93bb02)

Podemos observar como ya los mensajes llegan al servidor en la consola.

## Ejercicio 3 y 4
En este ejercicio lo que hay que implementar es que al meterse a localhost:3000 te pida que introduzcas un usuario y solo despues de eso puedes mandar mensajes, el html es el mismo que en el ejercicio anterior y lo que cambiaria seria el JS, la respuesta de la web es la siguiente:

![image](https://github.com/tryhubyak/DWES/assets/145651101/3c3759eb-80e5-4d97-9972-d5fd18bb8181)

![image](https://github.com/tryhubyak/DWES/assets/145651101/3369b3de-e994-453a-9540-0f77bbdd4eb4)

### Ejercicio 4
Se cada vez que te metes en localhost:3000 es como meterse en un chat nuevo que te pide tu usuario, y como podemos ver aqui hay ejemplo de varios usuarios conectados, con posibilidad de mandar mensajes y que aparece cuando de desconectan
![image](https://github.com/tryhubyak/DWES/assets/145651101/b7a3ce0a-6e6d-48e5-a321-5582a9915022)

## Ejercicio 5
Aqui se implementa la funcion de mensajeria privada y aparte modifico el diseño para hacelo mas atractivo ya que hemos implementado todas las funcionalidades que se pedian.

![image](https://github.com/tryhubyak/DWES/assets/145651101/abcf08a7-feb4-46df-bb55-000d6cb1a455)

## 31/01/24
Trabajo realizado por Veronika Tryhubyak para 2º DAW asignatura de desarrollo web entorno servidor

