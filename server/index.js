const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./model/User');

const config = require('./config/key');

// application/x-www-form-urlencoded로 되어있는 데이터를 분석해서 가져올 수 있도록 해줌.
app.use(bodyParser.urlencoded({ extended: true }));

// application/json로 되어있는 데이터를 분석해서 가져올 수 있도록 해줌.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected!!'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello, World!'));

app.post('/api/users/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);

    // save: mongodb의 method
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    // 1. 요청된 이메일을 db에서 찾는다.
    User.findOne({ email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '입력한 이메일은 존재하지 않습니다.',
            });
        }
        // 2. 이메일을 찾았으면 비밀번호가 일치하는지 찾는다.
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 맞지 않습니다.',
                });
            }
            // 3. 비밀번호가 맞다면 token을 생성한다.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다.
                // 어디에? -> 쿠키, 로컬스토리지 등.. web storage
                res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

// auth : 콜백 실행전 뭔가를 할 수 있게 해주는 미들웨어
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 왔다는 건 인증통과(=middleware(auth)를 통과)라는 뜻
    const { _id, role, email, name, lastname, image } = req.user;
    res.status(200).json({
        _id,
        isAdmin: role !== 0, // 0: 일반유저, 1: 관리자
        isAuth: true,
        email,
        name,
        lastname,
        image,
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

app.get('/api/hello', (req, res) => {
    res.send('안녕하세여');
});

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
