const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);

try{
    mongoose.connect('mongodb://localhost:27017/SocialMedia2', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("database connection established successfully");
}catch(err){
    console.log(err);
}

app.listen(3000,()=>{
    console.log("server started and listening on port 3000");
});