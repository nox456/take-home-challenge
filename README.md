# Take Home Challenge

## Challenge Requirements

- [x] **Tech Stack**
- [x] **Database**
- [x] **Web Scraping**
- [x] **Schedule Crawling**
- [x] **REST API Endpoints**
- [ ] **Unit Tests**
- [x] **Documentation**

## Setup dev environment

### Requirements

- **nodejs**
- **npm**
- **psql** **(PostgreSQL)**

First **clone this repository**, then navigate into the directory and execute the following commands:


### Setup database
Create the database in your local **PostgreSQL** server
```
$ psql postgres postgres
postgres=# CREATE DATABASE {database_name};
```
#### Creating schema
This will be create the **rates** table in the database
```
postgres=# \c {database_name}
{database_name}=# \i src/database/schema.sql
```

### Environment variables
Create a **.env** file using the **.env.example** file
```
# Server
HOST=""
PORT=""

# Database
DB_NAME=""
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASSWORD=""

# Cron job
JOB_TIME=""
```

### Installing dependencies
```
$ npm install
```

### Starting local server
```
$ npm run dev
```

## API Documentation

### Endpoints

#### Current

`GET /api/rates/current`: Gets the most recent rate stored.

Response Schema
```json
{
    "date": "string",
    "rate": "float"
}
```
Example
```json
{
    "date": "2025-02-05",
    "rate": 54.2
}
```
#### History
`GET /api/rates/history?start_date=""&end_date=""`: Gets the rates in a date interval, return all rates stored if there's not dates in the query.

Response Schema
```json
{
    [
        {
            "date": "string",
            "rate": "float"
        },
        {
            "date": "string",
            "rate": "float"
        },
        ...
    ]
}
```
Example

`GET /api/rates/history?start_date=2025-02-01&end_date=2025-02-03`
```json
{
    [
        {
            "date": "2025-02-01",
            "rate": 54.2
        },
        {
            "date": "2025-02-02",
            "rate": 53.12
        },
        {
            "date": "2025-02-03",
            "rate": 56.91
        }
    ]
}
```
