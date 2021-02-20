const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref:'Room'}],
    createdAt: {type: Number,default: Date.now},
})


module.exports=mongoose.model("User",userSchema)