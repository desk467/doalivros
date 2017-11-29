module.exports = function (app, models) {
    
    app.get('/', function (req, res) {
        res.render('index')
    })
}