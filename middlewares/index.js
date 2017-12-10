const session       = require('express-session')
const compression   = require('compression')
const bodyParser    = require('body-parser')
const morgan        = require('morgan')

const config = {
    secret: 'pUmjFjN6yvjEswe4vPnWKZ9snCiGYw34',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}

module.exports = function (app) {
    // Middlewares externos
    app.use(session(config))
    app.use(compression())
    app.use(morgan('dev'))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Middlewares opcionais, de implementação própria

    return {
        autenticacao_necessaria: require('middlewares/autenticacao'),
    }

}