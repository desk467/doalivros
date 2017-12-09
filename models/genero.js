// Genero

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Genero (
                id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                descricao   VARCHAR(8)
            )`)
        }
    }
}