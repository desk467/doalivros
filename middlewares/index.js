const compression   = require('compression')
const bodyParser    = require('body-parser')
const morgan        = require('morgan')

module.exports = function (app) {
    // Middlewares externos
    app.use(compression())
    app.use(morgan('dev'))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Middlewares de implementação própria
    app.use(require('middlewares/autenticacao'))
}