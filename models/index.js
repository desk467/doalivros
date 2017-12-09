module.exports = function (db) {
    // Registro de models

    const models = {
        Genero: require('models/genero')(db),
        Cidade: require('models/cidade')(db),
        Contato: require('models/contato')(db),
        Usuario: require('models/usuario')(db),
        Livro: require('models/livro')(db),
    }

    Object.values(models).forEach(model => model.montar())

    return models
}