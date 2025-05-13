const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();
const connectDB = async ()=>{ 
    try{
        console.log(`aa gya`);
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(chalk.blue(`MongoDB connected Successfully`));
    }
    catch(err){
        // console.log(`error dunga`);
        console.log("Error connecting to MongoDB:", err); 
    }
}

module.exports = connectDB;