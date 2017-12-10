// Usuario_Livro

module.exports = function (db) {
    const metodos = {
        montar: () => {
            db.run(`CREATE TABLE IF NOT EXISTS UsuarioLivro (
                id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                id_livro    INTEGER NOT NULL REFERENCES Livro(id),
                id_usuario  INTEGER NOT NULL REFERENCES Usuario(id)
            )`)
        },

        inserir: (usuario, livro, done) => {
            db.run('INSERT INTO UsuarioLivro (id_livro, id_usuario) VALUES (?, ?)', [
                livro.id,
                usuario.id,
            ], function (err, data) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    done(null, true)
                }
            })
        }
    }

    return metodos
}