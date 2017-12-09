const compression = require('compression')
const morgan      = require('morgan')

module.exports = function (app) {
    // Middlewares externos
    app.use(compression())
    app.use(morgan('dev'))

    // Middlewares de implementação própria
    app.use(require('middlewares/autenticacao'))
}