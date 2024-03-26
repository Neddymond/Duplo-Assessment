## Description
Duplo

## Getting Started
Follow these instructions to get this project up and running

## Installation
Clone the repository to your local machine:
git clone https://github.com/Neddymond/Duplo-Assessment

Navigate to the project directory:
cd duplo-assessment

Install dependencies:
```bash
$ npm install
```

## Running the app
This is a dockerised application. Please ensure to have docker on you system.
Firstly, please create a .env file and add the variables in the .env.examole file
After starting the Docker daemon, you can pull up a terminal and run the docker compose build command:
```bash
$ docker compose up --build
```

## Database
Kindly find below the url and credentials of the postgres and mongo database
```
  Postgres:
    url: http://localhost:5050/browser/
    credentials:
      email: pgadmin4@pgamin.org
      password: admin

  Mongo (Compass):
    uri: mongodb://localhost:27018
```

## Documentation
Kindly visit this url: http://localhost:3000/api to view the swagger api endpoints

## Document

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


