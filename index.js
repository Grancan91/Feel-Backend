const createUser = require('./api/models/userModel')
const connection = require('./db')

//Start Backend-Server
const start = async () => {
    await connection()
    createUser()
}
start()


