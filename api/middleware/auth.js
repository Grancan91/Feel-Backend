const jwt = require('jsonwebtoken')
const User = require('../models/user_model')

const checkAuth = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, async (error, result) => {
        if (error) {
            return res.status(403).send(error)
        }
        const user = await User.findOne({ email: result.email })
        if (!user) {
            return res.status(403).send(error)
        }
        res.locals.user = user
        next()
    })
}

module.exports = { checkAuth }