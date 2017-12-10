// autenticacao.js
// Verifica se o usuário está logado.
// Se sim, permite fazer cadastros, pedir doações etc.
// Se não, redireciona para login.

module.exports = function(req, res, next) {
    if(req.session.usuario) {
        next()
    } else {
        if(req.path.includes('/login')){
            next()
        } else {
            const ultimaUrl = new Buffer(req.path).toString('base64')
            res.redirect(`/login?redirect="${ultimaUrl}"`)
        }
    }
}