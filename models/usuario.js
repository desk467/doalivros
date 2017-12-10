// Usuario

const crypto = require('crypto')
const models = require('models')

function Usuario(dados, db = null) {
    this.id = dados.id
    this.nome = dados.nome
    this.apelido = dados.apelido
    this.email = dados.email

    models(db).Cidade.recuperar(dados.id_cidade, cidade => {
        this.cidade = cidade
    })

    models(db).Contato.recuperarPorUsuario(this, contatos => {
        this.contatos = contatos
    })
}

module.exports = function (db) {
    const metodos = {
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

        fabricar: (dados) => new Usuario(dados, db),

        hashear_senha: (senha) => crypto.createHash('md5').update(senha).digest("hex"),

        autenticar: (usuario, senha, done) => {
            const SQL = 'SELECT * FROM Usuario WHERE (apelido = ? OR email = ?) AND senha = ?'

            db.get(SQL, [usuario, usuario, metodos.hashear_senha(senha)], function (err, dados) {
                if (err) {
                    done(err, null)
                } else {
                    if (dados) {
                        done(null, metodos.fabricar(dados))
                    } else {
                        done('Usuário ou senha inválidos.', null)
                    }
                }
            })
        },
        recuperar: (id, done) => {
            db.get('SELECT * FROM Usuario WHERE id = ?', [id], function (err, dados) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    if (dados) {
                        done(null, metodos.fabricar(dados))
                    } else {
                        done('Usuário não encontrado', null)
                    }
                }
            })
        },

        inserir: (dados, done) => {
            if (dados.senha !== dados.confirmacao_senha) {
                done('Senhas não coincidem.', null)
                return
            }

            if (!dados.email.includes('@')) {
                done('E-mail inválido', null)
                return
            }

            if(dados.senha.length < 6){
                done('A senha precisa ter no mínimo, 6 caracteres', null)
                return
            }

            const SQL = `INSERT INTO Usuario
                                (nome, apelido, email, senha, id_cidade)
                        VALUES  (?, ?, ?, ?, ?)`

            db.run(SQL, [
                dados.nome,
                dados.apelido,
                dados.email,
                metodos.hashear_senha(dados.senha),
                dados.cidade,
            ], function (err, data) {
                if (err) {
                    done('Houve um erro ao processar a solicitação', null)
                } else {
                    done(null, metodos.fabricar({ ...dados, id: this.lastID }))
                }
            })
        }
    }

    return metodos
}