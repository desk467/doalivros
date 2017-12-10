// Cidade

const models = require('models')

function Cidade(dados, db = null) {
    this.id = dados.id
    this.nome = dados.nome

    models(db).Estado.recuperar(dados.id_estado, (erro, estado) => {
        this.estado = estado
    })
}

module.exports = function (db) {
    const metodos = {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Cidade (
                id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome        VARCHAR(60),
                id_estado   INTEGER NOT NULL REFERENCES Estado(id)
            )`)
        },

        fabricar: (dados) => { return new Cidade(dados, db) },

        recuperar: (id, done) => {
            db.get('SELECT * FROM Cidade WHERE id = ?', [id], function (err, dados) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    if (dados) {
                        done(null, metodos.fabricar(dados))
                    } else {
                        done('Cidade não encontrada', null)
                    }
                }
            })
        },
        recuperarPorEstado: (estado, done) => {
            db.all('SELECT * FROM Cidade WHERE id_estado = ?', [estado.id], function (err, lista) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    if (lista) {
                        done(null, lista.map(metodos.fabricar))
                    } else {
                        done(null, [])
                    }
                }
            })
        },
        recuperarTudo: (done) => {
            db.all('SELECT * FROM Cidade', function (err, lista) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    if (lista) {
                        done(null, lista.map(metodos.fabricar))
                    } else {
                        done(null, [])
                    }
                }
            })
        }
    }

    return metodos
}