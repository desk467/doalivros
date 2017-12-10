// Genero

function Genero(dados) {
    this.id = dados.id
    this.descricao = dados.descricao
}

module.exports = function (db) {
    return {
        montar: () => {
            db.run(`CREATE TABLE IF NOT EXISTS Genero (
                id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                descricao   VARCHAR(8)
            )`)
        },

        fabricar: (dados) => new Genero(dados),

        recuperar: (id, done) => {
            db.get('SELECT * FROM Genero WHERE id = ?', [id], function (err, dados) {
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

        recuperarTudo: (done) => {
            db.all('SELECT * FROM Genero', function (err, lista) {
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