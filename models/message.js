const mongoose=require("mongoose")

const messageSchema=mongoose.Schema({
    text: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    timestamp: {type: Number,default: Date.now},
})

module.exports=mongoose.model("Message",messageSchema)