const router = require('express').Router()

        
router
    // Set up routes for '/auth'
    .use('/auth', require('./auth_router'))
    // Set up routes for '/auth'
    .use('/record', require('./record_router'))





    // Set up routes for '/user' for TEST 
    .use('/user', require('./user_router'))

module.exports = router;