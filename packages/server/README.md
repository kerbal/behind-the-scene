## Description

BTS server

## Installation

```bash
$ yarn install
```
## Setup database

### Mongo Atlas

https://www.mongodb.com/cloud/atlas

1. Create a cluster on atlas
2. Get a connection URI from there

### MongoDB local with docker

1. Run docker

Connection URI: mongodb://localhost:27017/bts-dev

### MongoDB local

1. Install MongoDB
2. check `mongo --version`
3. setup replica set
4. Get connection URI

```
mongo --host localhost:27017 # (your mongo host)
rs.initiate({_id : 'rs0',members: [{ _id : 0, host : "localhost:27017" }]})
```

## Running the app

Make sure you add the `env vars` in `.env` file. Just copy the `.env.sample`file. And then execute:

```bash
# development (watch mode)
$ yarn dev

# production mode
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Documentation

### Back-end Guideline

```txt
.
├── .env (Make sure to create this file locally and fill the env vars)
├── src (alias: "@/*")
│   ├── main.ts (The entry file of the application)
│   ├── config (Custom config files)
│   ├── modules
│   │   ├── shared (module with global shared business logic and shared components , alias: "@shared/*")
│   │   ├── other-module (module with business logic)
│   │   │   ├── dtos
│   │   │   └── schemas
│   │   ├── app.module.ts (Root module)
│   │   └── app.controller.ts (Root module's controller)
│   └── common
│       ├── constants
│       ├── dtos (Data transfer object)
│       └── interfaces
├── test (Contains the end-to-end (e2e) tests)
├── Dockerfile (Yay! thanks god)
└── other-setting-files(.json|.js|*)
```

To keep layout clean, we follow this convention:

1. Modules:

   - Creating cmd: `nest g module [name]`

2. Controllers: HTTP routes map to handler functions in controllers.

   - Creating cmd: `nest g controller [name] [--no-spec]`

3. Services: Controllers call their service function.

   - Creating cmd: `nest g service [name] [--no-spec]`
   - A `module controller` must call only a `module service` or a `shared service`, and not any other service if it can be avoided.
   - A `module service` can call other services like `cats service`, etc.
   - Services have data layer implementation, ex: mongoose-schemas. They must be called only by their direct parent service

4. Don't forget the units testing

### Compodoc

```bash
$ yarn compodoc
```

### Open API

```bash
$ yarn dev
```

then go to: http://localhost:3000/docs

### External links/posts

[Confluence Pages](https://bts-dev.atlassian.net/l/c/PZKMA8Ge)
