const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    // rooms: {type: mongoose.Schema.Types.ObjectId, 
    //         ref:'Room'},
})


module.exports=mongoose.model("User",userSchema)