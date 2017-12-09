// Usuario

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Usuario (
                id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome       VARCHAR(100),
                apelido    VARCHAR(16),
                id_genero  INTEGER REFERENCES Genero(id)       
            )`)
        }
    }
}