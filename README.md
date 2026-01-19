<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

```
 Necip Fazil Akay
```

## Description

This api provides a point in polygon algorithm for given areas.

## Resources

You can reach the endpoints with
[Swagger Api links](http://localhost:3333/swagger) after run the application

## Installation

### With Docker compose

```bash
$ docker compose up -d
```

After the build is completed, all services should work successfully.

[Logger Api Service url on port 3333](http://localhost:3333)

[Postgres Adminer on port 8080](http://localhost:8080)

[Locust on port 8089](http://localhost:8089)

- On the locust web page, enter http://logger:3333 or http://host.docker.internal:3333 into the host field.

### Localhost with pnpm

```bash
$ pnpm install
```

### Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

### Connecting to The Database
on the [Adminer](http://localhost:8080/) page

- server: db:5432
- username: root
- pass: root
- database: location_logger

## Some Screenshots of The Outputs



<img width="1505" height="478" alt="image" src="https://github.com/user-attachments/assets/784ae78e-7519-4e7c-9e30-7b00a90f641f" />
<img width="1434" height="834" alt="image" src="https://github.com/user-attachments/assets/62397901-832d-4da0-9868-4d97d037a7bf" />

