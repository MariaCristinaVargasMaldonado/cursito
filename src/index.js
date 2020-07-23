const express = require('express');
const morgan = require('morgan')
const path = require('path')

const { mongoose } = require('./database')
const app = express()

// setting
app.set('port', process.env.PORT || 3000)


//middleware
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/task', require('./routes/task.route'))

//static files 

app.use(express.static(path.join(__dirname, 'public')))


//starting server
app.listen(app.get('port'), () =>[
    console.log(`Server on port ${app.get('port')}`)
]);