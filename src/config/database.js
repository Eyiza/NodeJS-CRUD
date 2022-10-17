const mongoose = require('mongoose');
const {config} = require('dotenv');

config()

async function connect(uri) {
    try {
        mongoose.connect(uri || process.env.MONGO_URI)
        console.log('MongoDB Atlas Connection Successful');
    } catch (error) {
        console.log('MongoDB Atlas Connection Failed');
        console.log(error.message);
    }
}
    
module.exports = connect;