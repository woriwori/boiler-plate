const { User } = require('../model/User');

// 인증 처리 하는 곳
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후 db에서 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        // 유저가 없으면 인증 실패
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        // 유저가 있으면 인증 성공
        req.token = token;
        req.user = user;
        next(); // 이게 있어야 middleware 다음 단계로 넘어갈 수 있음.
    });
};

module.exports = { auth };
