const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require('./model/User')

// application/x-www-form-urlencoded로 되어있는 데이터를 분석해서 가져올 수 있도록 해줌.
app.use(bodyParser.urlencoded({extended: true})) 

// application/json로 되어있는 데이터를 분석해서 가져올 수 있도록 해줌. 
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wonhee:dnjsdnjf12@boilerplate.7mhbn.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB connected!!'))
.catch((err) => console.log(err))
app.get('/', (req, res) => res.send('Hello, World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}`))