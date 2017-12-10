// injetar_usuario
// Torna visível os dados do usuário logado em todas as views,
// a partir da variavel usuario

module.exports = function (req, res, next) {
    res.locals.usuario = req.session.usuario

    next()
}