module.exports = function (app, models) {
    
    app.get('/', function (req, res) {
        res.render('livros/listagem')
    })

    app.get('/livro/:id_livro', function (req, res) {
        res.render('livros/detalhes')
    })

    app.get('/livro/novo', function (req, res) {
        res.render('livros/cadastro')
    })
}