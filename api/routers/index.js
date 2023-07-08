const router = require('express').Router()

router
    // Set up routes for 'user auth'
    .use('/auth', require('./auth_router'))
    // Set up routes for 'user'
    .use('/user', require('./user_router'))
    
    // Set up routes for 'records'
    .use('/record', require('./record_router'))

module.exports = router;