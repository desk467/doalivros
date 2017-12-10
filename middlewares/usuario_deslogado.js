// usuario_deslogado
// Proíbe o acesso as rotas de login e cadastro se o usuário
// já estiver logado.

module.exports = function (req, res, next) {
    if(req.session.usuario){
        res.redirect('/')
    } else {
        next()
    }
}