const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
        max:500
    },
    image:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
},{timestamps:true});

module.exports = mongoose.model("Post",postSchema);