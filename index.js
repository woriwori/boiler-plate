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

app.post('/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);

    // save: mongodb의 method
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    }); 
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))