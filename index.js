const createUser = require('./api/models/userModel')
const connection = require('./db')
const express = require('express');
const app = express();
const userRouter = require('./api/routers/userRouter');

//Start Backend-Server
const start = async () => {
    await connection()
    createUser()
    
    app.use('/api', userRouter);
    // Other middleware and configuration...
    app.listen(3000, () => {
        console.log('Waiting requests')
    })
}

start()



