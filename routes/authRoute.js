const User = require("../models/User");
const express = require("express");
const authRoute = express.Router();
const bcrypt = require("bcrypt");

authRoute.post("/register",async(req,res)=>{
    console.log("this method triggered register method");
    const {name,email,password} = req.body;
    let user;
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hashSync(password,salt);
    try{
        user = await new User({name,email,password:hashedPassword});
        user.save();

    }catch(err){
        console.log(err);
        return res.status(401).send({message:"error while registering"});
    }
    return res.status(200).send({user});
})

authRoute.get("/login",async(req,res)=>{
    const {email,password} = req.body;
    let user;
    try{
        user = await User.findOne({email});
    }catch(err){
        return res.status(401).send({message: "details not matched"});
    }
    try{
        const isMatched = await bcrypt.compareSync(user.password,password);
        if(isMatched){
            return res.status(201).send({message:"password matched with hashed password"});
        }
    }catch(err){
        console.log("error matching passwords");
    }

    console.log("logged in successfully");
    return res.status(201).send({user});
})
module.exports = authRoute;
