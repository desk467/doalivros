// Livro

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Livro (
                        id         INT NOT NULL PRIMARY KEY,
                        nome       VARCHAR(100),
                        autor      VARCHAR(50),
                        editora    VARCHAR(50),
                        descricao  VARCHAR(250),
                        status     BOOLEAN,
                        id_usuario INT NOT NULL,
                        id_genero  INT NOT NULL,
                        id_cidade  INT NOT NULL)`)
        }
    }
}