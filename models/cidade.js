// Cidade

function Cidade(dados) {
    this.id = dados.id
    this.nome = dados.nome
    this.estado = dados.estado
}

module.exports = function (db) {
    const metodos =  {
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
            db.all('SELECT * FROM Cidade WHERE estado = ?', function (err, lista) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (lista) {
                        done(lista.map(metodos.fabricar))
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
                        done(lista.map(metodos.fabricar))
                    } else {
                        done([])
                    }
                }
            })
        }
    }

    return metodos
}