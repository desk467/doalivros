// Livro

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Livro (
                        id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        nome       VARCHAR(100),
                        autor      VARCHAR(50),
                        editora    VARCHAR(50),
                        descricao  VARCHAR(250),
                        status     BOOLEAN,
                        id_usuario INTEGER NOT NULL REFERENCES Usuario(id),
                        id_genero  INTEGER NOT NULL REFERENCES Genero(id),
                        id_cidade  INTEGER NOT NULL REFERENCES Cidade(id)
                    )`)
        }
    }
}