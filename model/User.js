const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next) {
    // user.save 전에 이 콜백을 먼저 실행하겠다는 뜻
    // next 호출하면 save()가 호출됨

    const user = this;
    // index.js에서 new User(req.body);할때 userSchema에 req.body들어감

    if(user.isModified('password')){
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                // hash : salt로 암호화된 비밀번호
                if(err) return next(err);
                user.password = hash;
                next(); 
            });
        });
    }
    else{
        next();
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // this : mongoose를 통해 db에서 조회한 user 객체
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    // this : mongoose를 통해 db에서 조회한 user 객체
    const user = this;
    
    // jsonwebtoken을 이용해서 token을 생성
    // user._id + 'secretToken' = 새 토큰
    // 이후 secretToken을 통해 user._id를 알 수 있음
    const token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }