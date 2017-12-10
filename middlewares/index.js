const session = require('express-session')
const compression = require('compression')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const SQLiteStore = require('connect-sqlite3')(session);

const config = {
    secret: 'pUmjFjN6yvjEswe4vPnWKZ9snCiGYw34',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new SQLiteStore,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 semana 
}

module.exports = function (app) {
    // Middlewares externos
    app.use(session(config))
    app.use(compression())
    app.use(morgan('dev'))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Middlewares que todas as rotas passarão, de implementação própria
    app.use(require('middlewares/injetar_usuario'))

    // Middlewares opcionais, de implementação própria
    return {
        autenticacao_necessaria: require('middlewares/autenticacao'),
        usuario_deslogado: require('middlewares/usuario_deslogado'),
    }

}