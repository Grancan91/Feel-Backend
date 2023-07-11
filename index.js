
require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./db')
const express = require('express');
const app = express();
const router = require('./api/routers/index');

//Start Backend-Server
const start = async () => {
    await dbConnect()
    
    app.use(cors())
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



