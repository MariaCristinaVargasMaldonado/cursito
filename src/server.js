const express = require('express')
const app = express()

const path = require('path')
//const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const { mongoose } = require('./database')
const { fail } = require('assert')

require('./config/passport', passport)

// setting
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: 'nuevasession', //faztwebtutorialnode
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) //()
app.use(passport.session())
app.use(flash())

//routes
require('./app/routes', app, passport)

//archivos staticp
app.use(express.static(path.join(__dirname, 'public')))


app.listen(app.get('port'), () => {
    console.log('srver')
})