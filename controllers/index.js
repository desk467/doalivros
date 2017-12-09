module.exports = function (app, models) {
    // Registro dos controllers

    require('controllers/conta')(app, models)
    require('controllers/livros')(app, models)
}