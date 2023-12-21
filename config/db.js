const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');


dotenv.config();

const MongoUrl = process.env.MONGODB_URL;

const ConnectedDB = async()=>{
    try {
        const dblink = await mongoose.connect(MongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
    });
    console.log(`Database is Connected at Url ${MongoUrl}`.bgGreen.bold);
    } catch (error) {
        console.log(error);
        throw error
    }
};
module.exports = ConnectedDB;