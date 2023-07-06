const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/db_feel';

const dbConnect = async () => {
    await mongoose.connect(URI)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));
}

module.exports = dbConnect;
