<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

```
 Necip Fazil Akay
```

## Description

This api provides point in polygon algorithm for given areas.

## Resources

you can reach the endpoints with my
[Postman Api links](https://www.postman.com/necipfazilakay/workspace/location-logger-api/collection/12514186-feee783b-d4b7-4cfb-b3fe-ebd0af2d5496?action=share&creator=12514186&active-environment=12514186-c4d20ceb-f1bf-41bb-99ce-ae176a09961b)

## Installation

### With Docker compose

```bash
$ docker compose up -d
```

After build completed, all services should work successfully.

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
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
