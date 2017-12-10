// Cidade

function Cidade(dados) {
    this.id = dados.id
    this.nome = dados.nome
    this.estado = dados.estado
}

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Cidade (
                id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome    VARCHAR(60),
                estado  CHAR(2)
            )`)
        },

        fabricar: (dados) => { return new Cidade(dados) },

        recuperar: (id, done) => {
            db.get('SELECT * FROM Cidade WHERE id = ?', [id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(this.fabricar(dados))
                    } else {
                        done(null)
                    }
                }
            })
        },
        recuperarPorEstado: (estado, done) => {
            db.all('SELECT * FROM Cidade WHERE estado = ?', function (err, lista) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (lista) {
                        done(lista.map(this.fabricar))
                    } else {
                        done([])
                    }
                }
            })
        },
        recuperarTudo: (done) => {
            db.all('SELECT * FROM Cidade', function (err, lista) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (lista) {
                        done(lista.map(this.fabricar))
                    } else {
                        done([])
                    }
                }
            })
        }
    }
}