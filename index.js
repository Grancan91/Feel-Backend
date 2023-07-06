const { createUser } = require('./api/controllers/user_controller')
const dbConnect = require('./db')
const express = require('express');
const app = express();
const router = require('./api/routers/index');

//Start Backend-Server
const start = async () => {
    await dbConnect()
    //createUser()
    
    app.use('/api', router);
    // Other middleware and configuration...
    app.listen(3000, () => {
        console.log('Waiting requests')
    })
}

start()



