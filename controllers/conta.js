module.exports = function (app, models) {

    app.get('/login', function (req, res) {
        res.render('conta/login', { erro: null })
    })

    app.post('/login', function (req, res) {
        models.Usuario.autenticar(req.body.usuario, req.body.senha, function (erro, usuario) {
            if (erro) {
                res.render('conta/login', { erro })
            } else {
                res.redirect('/')
            }
        })
    })

    app.get('/cadastro', function (req, res) {
        res.render('conta/cadastro', { erro: null })
    })

    app.post('/cadastro', function (req, res) {
        models.Usuario.inserir(req.body, function (erro, usuario) {
            if (erro) {
                console.log(erro)
                res.render('conta/cadastro', { erro })
            } else {
                res.redirect('/login')
            }
        })
    })

    app.get('/conta', function (req, res) {
        res.render('conta/detalhes')
    })
}