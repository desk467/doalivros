module.exports = function (app, models, m) {

    app.get('/', function (req, res) {
        res.render('livros/listagem')
    })

    app.post('/livro/quero', m.autenticacao_necessaria, function (req, res) {
        models.UsuarioLivro.inserir(
            request.session.usuario,
            request.body.livro,
            function (erro, sucesso) {
                if (erro) {
                    res.json({ status: false, mensagem })
                } else {
                    res.json({ status: true, mensagem: 'Livro adicionado com sucesso.' })
                }
            }
        )
    })

    app.get('/livro/novo', m.autenticacao_necessaria, function (req, res) {
        res.render('livros/cadastro')
    })

    app.get('/livro/:id_livro', function (req, res) {
        res.render('livros/detalhes')
    })
}