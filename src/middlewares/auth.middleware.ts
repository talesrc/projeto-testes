const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    const access_token = req.cookies.access_token
    if (access_token == undefined) return res.redirect('/withoutAuth')
    else {
        jwt.verify(access_token, 'secretKey', function (err, decoded) {
            if (err) {
                return res.redirect('/withoutAuth')
            }
            next()
        })
    }
}

module.exports = {
    validateToken
}
