# mariadb-api

A tiny JSON API implementation for MariaDB.

## Endpoints

The current API consists of the following resource collection endpoints:

* `/v1/users`
* `/v1/tables`
* `/v1/variables`
* `/v1/innodb_metrics`
* `/v1/innodb_mutexes`

Each endpoint conforms to the [JSON API specification](http://jsonapi.org/format/).

## Installation

```
npm i
node mariadb-api.js
```

## Configuration

Update the values in `config.json` to your liking.

```javascript
{
    "user": "maxuser",    // User used to connect to the database
    "password": "maxpwd", // Password for the user
    "host": "127.0.0.1",  // Hostname of the database
    "port": 3306,         // Port where the database is listening
    "listen": 8080        // Post where the API will listen
}
```
