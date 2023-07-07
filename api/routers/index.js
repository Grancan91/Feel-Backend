const router = require('express').Router()

router
    // Set up routes for '/auth'
    .use('/auth', require('./auth_router'))
    // Set up routes for '/auth'
    .use('/record', require('./record_router'))

module.exports = router;