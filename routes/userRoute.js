const User = require("../models/User");
const express = require("express");
const userRoute = express.Router();

userRoute.put("/:id",async(req,res)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{$set:req.body});
        return res.status(200).send({message:"user updated successfully"});
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"updation failed"});
})
userRoute.get("/:id",async(req,res)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findOne({_id:id});
        return res.status(200).send({user});
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"user fetching failed"});
})

userRoute.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndDelete({_id:id});
        return res.status(200).send({message:"user deleted successfully"});
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"user deletion failed"});
})

userRoute.put("/:id/follow",async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;
    if(userId !== id){
        let user;
        let curUser;
        try{
            user = await User.findById(id);
            curUser = await User.findById(userId);
            if(!user.followers.includes(userId)){
                await user.updateOne({$push:{followers:userId}});
                await curUser.updateOne({$push:{following:id}});
                return res.status(200).send({message:"user added successfully"});
            }else{
                return res.status(500).send({message:"user already there"});
            }
        }catch(err){
            console.log(err);
        }
    }
    return res.status(500).send({message:"user successfully added"});
})

userRoute.put("/:id/unfollow",async(req,res)=>{
    const id = req.params.id;
    const {userId} = req.body;
    if(userId !== id){
        let user;
        let curUser;
        try{
            user = await User.findById(id);
            curUser = await User.findById(userId);
            if(user.followers.includes(userId)){
                await user.updateOne({$pull:{followers:userId}});
                await curUser.updateOne({$pull:{following:id}});
                return res.status(200).send({message:"user removed successfully"});
            }else{
                return res.status(500).send({message:"user not there"});
            }
        }catch(err){
            console.log(err);
        }
    }
    return res.status(500).send({message:"user is not following you idiot"});
})

module.exports = userRoute;