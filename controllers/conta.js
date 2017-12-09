module.exports = function (app, models) {
    
    app.get('/login', function (req, res) {
        res.render('conta/login')
    })

    app.get('/cadastro', function (req, res) {
        res.render('conta/cadastro')
    })

    app.get('/conta', function (req, res) {
        res.render('conta/detalhes')
    })
}