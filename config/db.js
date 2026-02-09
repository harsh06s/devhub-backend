// PostgreSQL connection using peer authentication (local development)

const {Pool} = require("pg");

const pool = new Pool ({
    user:"harsh",
    database:"authdb",
    host:"/var/run/postgresql",
});


module.exports = pool;