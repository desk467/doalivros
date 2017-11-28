module.exports = function (db) {
    // Registro de models

    const models = [
        require('models/livro')(db),
        require('models/cidade')(db),
        require('models/genero')(db),
        require('models/usuario')(db),
        require('models/contato')(db),
    ]

    models.forEach(model => model.montar())
}