const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String
    },
    coverPicture:{
        type:String
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);