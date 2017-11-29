require('dotenv').config()

let db = require('database')

let express = require('express')
let app = express()

app.set('view engine', 'ejs')

const models = require('models')(db)
require('middlewares')(app)
require('controllers')(app, models)

app.listen(process.env.PORTA, function () {
    console.log(`[app] Aplicação iniciada.`)
    console.log(`[link] http://localhost:${process.env.PORTA}`)
})

