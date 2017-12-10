// Livro

const models = require('models')


function Livro(dados) {
    this.id = dados.id
    this.nome = dados.nome
    this.autor = dados.autor
    this.editora = dados.editora
    this.descricao = dados.descricao
    this.status = dados.status

    models.Usuario.recuperar(dados.id_usuario, usuario => {
        this.usuario = usuario
    })

    models.Genero.recuperar(dados.id_genero, genero => {
        this.genero = genero
    })

    models.Cidade.recuperar(dados.id_cidade, cidade => {
        this.cidade = cidade
    })
}

module.exports = function (db) {
    return {
        montar: () => {
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
        },

        fabricar: (dados) => new Livro(dados),

        recuperarInteressesPorUsuario:  (usuario, done) => {
            const SQL = `
                SELECT Livro.* FROM Livro
                    INNER JOIN UsuarioLivro
                    ON Livro.id = UsuarioLivro.id_livro
                    WHERE UsuarioLivro.id_usuario = ?
            `

            db.all(SQL, [usuario.id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(this.fabricar(dados))
                    } else {
                        done([])
                    }
                }
            })
        },

        recuperarPorUsuario: (usuario, done) => {
            db.all('SELECT * FROM Livro WHERE id_usuario = ?', [usuario.id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(this.fabricar(dados))
                    } else {
                        done([])
                    }
                }
            })
        },

        recuperarPorCidade: (cidade, done) => {
            db.all('SELECT * FROM Livro WHERE id_cidade = ?', [cidade.id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(this.fabricar(dados))
                    } else {
                        done([])
                    }
                }
            })
        },

        recuperarPorGenero: (genero, done) => {
            db.all('SELECT * FROM Livro WHERE id_genero = ?', [genero.id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(this.fabricar(dados))
                    } else {
                        done([])
                    }
                }
            })
        },

        buscar: (consulta, done) => {
            db.all('SELECT * FROM Livro WHERE nome ilike %?% OR descricao ilike %?%', [consulta, consulta], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if (dados) {
                        done(this.fabricar(dados))
                    } else {
                        done([])
                    }
                }
            })
        },

        recuperar: (id, done) => {
            db.get('SELECT * FROM Livro WHERE id = ?', [id], function (err, dados) {
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

        inserir: (dados, done) => {
            const SQL = `INSERT INTO Livro
                                (
                                    nome,
                                    autor,
                                    editora,
                                    descricao,
                                    status,
                                    id_usuario,
                                    id_genero,
                                    id_cidade
                                )
                        VALUES  (?, ?, ?, ?, ?, ?, ?, ?)`

            db.run(SQL, [
                dados.nome,
                dados.autor,
                dados.editora,
                dados.descricao,
                dados.status,
                dados.usuario.id,
                dados.genero.id,
                dados.cidade.id,
            ], function (err, data) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    done(this.fabricar({ ...dados, id: this.lastID }))
                }
            })
        }
    }
}