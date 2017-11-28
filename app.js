require('dotenv').config()

let db = require('database')

let express = require('express')
let app = express()

app.set('view engine', 'ejs')

require('middlewares')(app)
require('controllers')(app)
require('models')(db)

app.listen(process.env.PORTA, function () {
    console.log(`###################`)
    console.log(`Aplicação iniciada.`)
    console.log(`Acesse: http://localhost:${process.env.PORTA}`)
})

