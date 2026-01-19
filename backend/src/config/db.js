const mongoose = require('mongoose');

async function connectDB(uri){
    try{
        await mongoose.connect(uri);
        console.log('MONGODB CONNECTED');
    }
    catch(error){
        console.log('DATABASE CONNECTION FAILED',error);
        process.exit(1);

    }
}
module.exports = connectDB;