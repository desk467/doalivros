module.exports = function (app, models, m) {

    app.get('/login', function (req, res) {
        res.render('conta/login', { erro: null })
    })

    app.post('/login', function (req, res) {
        models.Usuario.autenticar(req.body.usuario, req.body.senha, function (erro, usuario) {
            if (erro) {
                res.render('conta/login', { erro })
            } else {
                req.session.usuario = usuario
                res.redirect('/')
            }
        })
    })

    app.post('/logout', m.autenticacao_necessaria, function (req, res) {
        req.session.destroy()
    })

    app.get('/cadastro', function (req, res) {
        res.render('conta/cadastro', { erro: null })
    })

    app.post('/cadastro', function (req, res) {
        models.Usuario.inserir(req.body, function (erro, usuario) {
            if (erro) {
                res.render('conta/cadastro', { erro })
            } else {
                res.redirect('/login')
            }
        })
    })

    app.get('/conta', m.autenticacao_necessaria, function (req, res) {
        res.render('conta/detalhes')
    })
}