module.exports = function (app, models, middlewares) {
    // Registro dos controllers
    require('controllers/util')(app, models, middlewares)
    require('controllers/conta')(app, models, middlewares)
    require('controllers/livros')(app, models, middlewares)
}