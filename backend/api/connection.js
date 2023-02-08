const {Pool} = require('pg');
require("dotenv").config();

const devConfig = {
    "host": process.env.PG_HOST,
    "user": process.env.PG_USER,
    "port": process.env.PG_PORT,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "max": 20,
    "connectionTimeoutMillis": 0,
    "idleTimeoutMillis": 0
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false 
      }
};

const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig);

module.exports = pool;
