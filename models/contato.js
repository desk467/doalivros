// Contato

const TipoContato = {
    TELEFONE: 0,
    EMAIL: 1,
    FACEBOOK: 2,
    TWITTER: 3,
}

function Contato(dados) {
    this.id = dados.id
    this.tipo = dados.tipo
    this.valor = dados.valor
}

module.exports = function (db) {
    const metodos = {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Contato (
                id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                tipo        INTEGER NOT NULL,
                valor       VARCHAR(16),
                id_usuario  INTEGER NOT NULL REFERENCES Usuario(id)
            )`)
        },

        fabricar: (dados) => new Contato(dados),

        inserir: (dados, done) => {
            const SQL = `INSERT INTO Contato (tipo, valor, id_usuario) VALUES  (?, ?, ?)`

            db.run(SQL, [
                dados.tipo,
                dados.valor,
                dados.usuario.id,
            ], function (err, data) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    done(metodos.fabricar({ ...dados, id: this.lastID }))
                }
            })
        },

        recuperarPorUsuario: (usuario, done) => {
            db.all('SELECT * FROM Contato WHERE id_usuario = ?', [usuario.id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(metodos.fabricar(dados))
                    } else {
                        done(null)
                    }
                }
            })
        }
    }

    return metodos
}