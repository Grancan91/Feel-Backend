const router = require('express').Router()

router
    // Set up routes for 'user auth'
    .use('/auth', require('./auth_router'))

    // Set up routes for 'user'
    .use('/user', require('./user_router'))

    // Set up routes for 'records'
    .use('/record', require('./record_router'))

    // Set up routes for 'emotions'
    .use('/emotion', require('./emotion_router'))

    // Set up routes for 'causes'
    .use('/cause', require('./cause_router'))

    // Set up routes for 'symptoms'
    .use('/symptom', require('./symptom_router'))

    // Set up routes for 'strategies'
    .use('/strategy', require('./strategy_router'))
    
module.exports = router;