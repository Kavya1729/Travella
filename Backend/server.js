const express = require('express');
const connectDB = require("./Src/Config/ConnectDB");
const chalk = require('chalk');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT||5001;

app.use(express.json());

connectDB();

app.use('/api/users',require('./Src/Routes/UserRoute'));   //for login,logout,register 
// app.use('/api/listings',require('./Src/Routes/ListingRoute')); //for listing

app.listen(PORT,(req,res)=>{ 
    console.log(chalk.blue(`Server is running on port ${PORT}`));
})

