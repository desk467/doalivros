require('dotenv').config()

let db = require('database')

let express = require('express')
let app = express()

app.set('view engine', 'ejs')
app.use(express.static('static'))

const models = require('models')(db)
const middlewares = require('middlewares')(app)
require('controllers')(app, models, middlewares)

app.listen(process.env.PORTA, function () {
    console.log(`[app] Aplicação iniciada.`)
    console.log(`[link] http://localhost:${process.env.PORTA}`)
})

