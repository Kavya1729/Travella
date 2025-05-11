const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();
const connectDB = async ()=>{ 
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        // console.log(`MongoDB connected: ${connect.connection.host}`);
        console.log(chalk.blue(`MongoDB connected Successfully`));
    }
    catch(err){
        console.log("Error connecting to MongoDB:", err); 
    }
}

module.exports = connectDB;