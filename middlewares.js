const compression = require('compression')
const morgan = require('morgan')

module.exports = function (app) {
    app.use(compression())
    app.use(morgan('dev'))
}