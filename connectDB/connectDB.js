async function connectDB() {

    const mongoose = require('mongoose');

    const conn = mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let log = {
        mongoDB: 'connected',
        url: process.env.MONGO_URL,
        host: (await conn).connection.host
    };

    console.log(log);

    return conn;
}

module.exports = connectDB;