# Practica Symfony
## Configuracion de entorno para trabajar con framework de php symfony

### Pasos previos:
1. Hay que tener instalado el php 8.1 o superior.
```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install php
```
2. Instale Composer, que se utiliza para instalar paquetes PHP. Para ello podemos ejecutar ese comando:
```
php composer.phar self-update
```
3. Opcionalmente se puede instalar el Symfony CLI el cual seria de apoyo ya que añade herramientas necesarias para desarrollar localmente.


### Procedimiento:
1. Cremos una carpeta donde vamos a trabajar la cual en mi caso se llama Practica_4.
1. Dentro de dicha carpeta creamos 3 mas vacias las cuales seran nginx, php y symfony. Nuestro esqueleto de framework estara albergado en la carpeta symfony.
1. En la carpeta de nginx creamos un archivo default.conf con el siguiente contenido:

```
server {
    listen 80;
    root /var/www/<src_proyecto>/public;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ ^/index\.php(/|$) {
        # Connect to the Docker service using fpm
        fastcgi_pass php:9000;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
        internal;
    }
    location ~ \.php$ {
        return 404;
    }

    error_log /dev/stdout info;
    access_log /var/log/nginx/project_access.log;
}
```
2. En la carpeta php creamos un dokerfile para php con el siguiente contenido:
```
FROM php:8.1-fpm

RUN apt update \
    && apt install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony 

RUN git config --global user.email "veronikatryhubyak@gmail.com" \ 
    && git config --global user.name "tryhubyak"

RUN symfony check:requirements

WORKDIR /var/www/symfony
```
3. Creamos un docker-compose.yml con el siguiente contenido:

```
version: '3.8'

services:
  database:
    container_name: database
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: symfony_docker
      MYSQL_USER: symfony
      MYSQL_PASSWORD: symfony
    ports:
      - '4306:3306'
    volumes:
      - mysql-symfony:/var/lib/mysql
  php:
    container_name: php
    build:
      context: ./php
      dockerfile: Dockerfile-php
    ports:
      - '9000:9000'
    volumes:
      - ./symfony:/var/www/symfony
    depends_on:
      - database
  nginx:
    container_name: nginx
    image: nginx:stable-alpine
    ports:
      - '8050:80'
    volumes:
      - ./symfony:/var/www/symfony
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
    - php
volumes:
  mysql-symfony:
```
Ahora hay que hacer 
```
docker-compose build
```
Con ello construimos los 3 contenedores que vamos a necesitar y los levantamos con el comando
```
docker-compose up -d
```
4. Para comprobar que todo funcione podemos crear una carpeta public con un index.php en symfony y si al poner localhost:8050 (en este caso) funciona es que hemos hecho todo bien.
   
Nos tiene que quedar la siguiente estructura de carpetas como en la captura:

![Captura de pantalla 2023-11-08 125408](https://github.com/tryhubyak/DWES/assets/145651101/25e0918d-dd64-43d3-b08a-c9f133ab70c9)

Con eso dariamos por finalizada la practica, los archivos que tengo subidos extra en carpeta symfony son de dia 8/11 de trabajo en clase.

```
DATABASE_URL="mysql://root:secret@database:3306/symfony_docker?serverVersion=8.0"
```
En el siguiente readme ya se explicaran los pasos de creacion de una API basica y que es lo que hace falta para ello 
