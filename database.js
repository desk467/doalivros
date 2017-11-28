const sqlite3 = require('sqlite3')

const database = new sqlite3.Database('./banco.db')

module.exports = database