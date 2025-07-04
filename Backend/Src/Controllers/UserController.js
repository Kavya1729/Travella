const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');
const asynchandler = require('express-async-handler');
const chalk = require('chalk');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
}

const registerUser = asynchandler(async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    });
    if(user){
        console.log(chalk.blue('User created successfully'));
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

const loginUser = asynchandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

const logoutUser = asynchandler(async(req,res)=>{
    res.json({ message: "User logged out successfully" });    //REMAINING
}) 

const currentUser = asynchandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
}