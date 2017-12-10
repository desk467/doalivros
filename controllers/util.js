module.exports = function (app, models, m) {
    app.get('/cidades/:id_estado', function (req, res) {
        const estado = models.Estado.fabricar({ id: req.params.id_estado })
        models.Cidade.recuperarPorEstado(estado, function (erro, cidades) {
            if (erro) {
                res.json({ status: false, mensagem: erro })
            } else {
                res.json({ status: true, cidades })
            }
        })
    })
}