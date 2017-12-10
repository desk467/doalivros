module.exports = function (app, models, m) {

    app.get('/login', m.usuario_deslogado, function (req, res) {
        res.render('conta/login', { erro: null })
    })

    app.post('/login', m.usuario_deslogado, function (req, res) {
        models.Usuario.autenticar(req.body.usuario, req.body.senha, function (erro, usuario) {
            if (erro) {
                res.render('conta/login', { erro })
            } else {
                req.session.usuario = usuario
                req.session.save()

                res.redirect('/')
            }
        })
    })

    app.get('/logout', m.autenticacao_necessaria, function (req, res) {
        req.session.destroy()
        res.redirect('/')
    })

    app.get('/cadastro', m.usuario_deslogado, function (req, res) {
        res.render('conta/cadastro', { erro: null })
    })

    app.post('/cadastro', m.usuario_deslogado, function (req, res) {
        models.Usuario.inserir(req.body, function (erro, usuario) {
            if (erro) {
                res.render('conta/cadastro', { erro })
            } else {
                req.session.usuario = usuario
                req.session.save()

                res.redirect('/login')
            }
        })
    })

    app.get('/conta', m.autenticacao_necessaria, function (req, res) {
        res.render('conta/detalhes')
    })
}