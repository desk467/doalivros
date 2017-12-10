module.exports = function (app, models) {

    app.get('/login', function (req, res) {
        res.render('conta/login')
    })

    app.post('/login', function(req, res){
        
    })

    app.get('/cadastro', function (req, res) {
        res.render('conta/cadastro')
    })

    app.get('/conta', function (req, res) {
        res.render('conta/detalhes')
    })
}