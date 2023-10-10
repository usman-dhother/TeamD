const jwt = require('jsonwebtoken');
const SECRET = "HUGER_EXPRESS_SECRET_KEY";

exports.generate = (user) => {
    return jwt.sign({username: user._id}, SECRET, {
        expiresIn: '1h'
    })
}

exports.verify = (token) => {
    return jwt.verify(token, SECRET)
}
