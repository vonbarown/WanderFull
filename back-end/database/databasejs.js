const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/wanderfull_db'
const db = pgp(connectionString)

module.exports = db
