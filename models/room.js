const mongoose=require("mongoose")

const roomSchema=mongoose.Schema({
    name: String,
    address: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Number,default: Date.now},
})


module.exports=mongoose.model("Room",roomSchema)