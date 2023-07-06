const router = require('express').Router()

// Set up routes for '/auth'
//router.use('/auth', ()=> {console.log('hola')})
router.use('/auth', require('./auth_router'))

// Set up routes for '/user'
router.use('/user', require('./user_router'))

// Set up routes for '/record'


module.exports = router;