// Usuario

const crypto = require('crypto')
const models = require('models')

function Usuario(dados) {
    this.id = dados.id
    this.nome = dados.nome
    this.apelido = dados.apelido
    this.email = dados.email

    models.Cidade.recuperar(dados.id_cidade, cidade => {
        this.cidade = cidade
    })

    models.Contato.recuperarPorUsuario(this, contatos => {
        this.contatos = contatos
    })
}

module.exports = function (db) {
    return {
        montar: () => {
            db.run(`CREATE TABLE IF NOT EXISTS Usuario (
                id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome       VARCHAR(100),
                apelido    VARCHAR(16),
                email      VARCHAR(16),
                senha      VARCHAR(128),
                genero     VARCHAR(16),
                id_cidade  INTEGER REFERENCES Cidade(id)       
            )`)
        },

        fabricar: (dados) => new Usuario(dados),

        hashear_senha: (senha) => crypto.createHash('md5').update(senha).digest("hex"),

        autenticar: (usuario, senha, done) => {
            const SQL = 'SELECT * FROM Usuario WHERE apelido = ? OR email = ? AND senha = ?'

            db.get(SQL, [usuario, usuario, this.hashear_senha(senha)], function (err, dados) {
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
        recuperar: (id, done) => {
            db.get('SELECT * FROM Usuario WHERE id = ?', [id], function (err, dados) {
                if (err) {
                    throw 'Houve um erro ao processar a solicitação'
                } else {
                    if(dados) {
                        done(this.fabricar(dados))
                    } else {
                        done(null)
                    }
                }
            })
        },

        inserir: (dados, done) => {
            if (dados.senha !== dados.confirmacao_senha)
                throw 'Senhas não coincidem.'

            if (!dados.email.includes('@'))
                throw 'E-mail inválido'

            const SQL = `INSERT INTO Usuario
                                (nome, apelido, email, senha, id_genero, id_cidade)
                        VALUES  (?, ?, ?, ?, ?, ?)`

            db.run(SQL, [
                dados.nome,
                dados.apelido,
                dados.email,
                dados.senha,
                dados.id_genero,
                dados.id_cidade,
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