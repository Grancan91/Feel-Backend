
require('dotenv').config();
const dbConnect = require('./db')
const express = require('express');
const app = express();
const router = require('./api/routers/index');

//Start Backend-Server
const start = async () => {
    await dbConnect()
    
    //Json parser for body request.
    app.use(express.json())
    //Index Router
    app.use('/api', router);
    // Other middleware and configuration...
    //API Start
    app.listen(process.env.PORT, () => {
        console.log('Waiting requests')
    })
}

start()



