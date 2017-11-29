module.exports = function (db) {
    // Registro de models

    const models = {
        Livro: require('models/livro')(db),
        Cidade: require('models/cidade')(db),
        Genero: require('models/genero')(db),
        Usuario: require('models/usuario')(db),
        Contato: require('models/contato')(db),
    }

    Object.values(models).forEach(model => model.montar())

    return models
}