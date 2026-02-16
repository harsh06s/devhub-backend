// PostgreSQL connection using peer authentication (local development)

const {Pool} = require("pg");

const pool = new Pool ({
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
});


module.exports = pool;