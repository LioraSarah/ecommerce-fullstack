const {Pool} = require('pg');

const pool = new Pool({
    "host": "localhost",
    "user": "postgres",
    "port": 5433,
    "password": "postgres",
    "database": "postgres",
    "max": 20,
    "connectionTimeoutMillis": 0,
    "idleTimeoutMillis": 0
});

module.exports = pool;
