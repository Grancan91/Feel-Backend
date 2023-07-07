
require('dotenv').config();
const dbConnect = require('./db')
const express = require('express');
const app = express();
const router = require('./api/routers/index');

//Start Backend-Server
const start = async () => {
    await dbConnect()
    
    app.use(express.json())
    app.use('/api', router);
    // Other middleware and configuration...
    app.listen(3000, () => {
        console.log('Waiting requests')
    })
}

start()



