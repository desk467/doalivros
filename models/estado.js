// Estado

function Estado(dados) {
    this.id = dados.id
    this.nome = dados.nome
}

module.exports = function (db) {
    const metodos = {
        montar: () => {
            db.run(`CREATE TABLE IF NOT EXISTS Estado (
                id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome    VARCHAR(60),
                sigla   CHAR(2)
            )`)
        },

        fabricar: (dados) => new Estado(dados),

        recuperar: (id, done) => {
            db.get('SELECT * FROM Estado WHERE id = ?', [id], function (err, dados) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    if (dados) {
                        done(null, metodos.fabricar(dados))
                    } else {
                        done('Estado não encontrado', null)
                    }
                }
            })
        },

        recuperarTudo: (done) => {
            db.get('SELECT * FROM Estado', [id], function (err, dados) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    if (dados) {
                        done(null, metodos.fabricar(dados))
                    } else {
                        done(null, [])
                    }
                }
            })
        },
    }

    return metodos
}