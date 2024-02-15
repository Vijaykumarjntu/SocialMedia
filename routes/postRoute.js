const Post = require("../models/Post");
const User = require("../models/User");
const express = require("express");
const postRoute = express.Router();

postRoute.post("/register",async(req,res)=>{
    try{
        const post = new Post(req.body);
        await post.save();
        return res.status(201).send({post});
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"unable to post it"});
})

postRoute.put("/:id",async(req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    try{
        if(post.userId === req.body.userId){
            await Post.updateOne({$set:req.body});
            return res.status(201).send({message:"post updated successfully"});
        }
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"failed to update"});
})

postRoute.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    try{
        if(post.userId === req.body.userId){
            await Post.findByIdAndDelete(id);
            return res.status(201).send({message:"post updated successfully"});
        }
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"failed to delete"});
})

postRoute.put("/:id/likes",async(req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    try{
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            return res.status(201).send({message:"like added successfully"});
        }
    }catch(err){
        console.log(err);
    }
    return res.status(500).send({message:"failed to delete"});
})

postRoute.get("/timeline", async (req, res) => {
    try {
        let curUser = await User.findById(req.body.userId);
        let curUserPosts = await Post.find({ userId: req.body.userId });

        let friends = await Promise.all(
            curUser.following.map(x => Post.find({ userId: x }))
        );

        return res.status(201).send(curUserPosts.concat(...friends));
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = postRoute;