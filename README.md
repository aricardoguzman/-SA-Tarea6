# Tarea 6 - SA - 201010425

## Docker Compose

## Instalación

### Requerimientos

- Docker

En caso que no se tenga seguir este [tutorial](https://www.digitalocean.com/community/tutorials/como-instalar-y-usar-docker-en-ubuntu-18-04-1-es)

### Estructura de docker-compose

```ssh
    mongo:
        build: ./mongo/
        image: mongo
        command: mongod --port 27018
        volumes:
            - ./mongo/data:/data/db
        environment:
            MONGO_INITDB_DATABASE: "sa"
        ports:
            - 27018:27018
        container_name: mongo
```


```
    api:
        build: ./api/
        restart: always
        ports:
            - 3000:3000
        links:
            - mongo:mongo
        container_name: api-app
        environment:
            MONGO_DB_NAME: "sa"
            MONGODB_URI: "mongodb://mongo:27018"
            PORT: 27018
        command: npm start
```

En este caso cada etiqueta tiene un fin:

- build : ubicación del archivo Dockerfile para la imagen de mongo
- image : imagen a utilizar
- command : comandos a ejecutar una vez levantada la imagen
- volumes : mapeo entre carpetas del contenedor y local
- environment : variables de entorno
- ports : mapeo entre puertos del host y contenedor
- container_name : nombre del contenedor

### Dockerfiles

Docker file de la aplicación

```
FROM node:10.0.0

COPY api api/
WORKDIR /api
RUN npm install

EXPOSE 3000

CMD npm start
```

Dockerfile de mongo 

```
FROM mongo:latest

EXPOSE 27018

COPY ./init-db.d/seed.js /docker-entrypoint-initdb.d
```

Al igual que el anterior

- FROM : indica la imagen a utilizar
- COPY : copia de un src a un destino
- WOKDIR : es un CD a la carpeta que se desea en el contenedor
- RUN : para correr comandos bash
- EXPOSE : expone los puertos en caso que no se especifique en el docker-compose
- CMD : similar a RUN

## Correr

Para correr sólo debe utilizar el comando en la carpeta que tiene el docker compose

``` docker-compose build ```

y posteriormente

``` docker-compose up ```

si se desea construir antes de levantar las imágenes, correr con la bandera -b
