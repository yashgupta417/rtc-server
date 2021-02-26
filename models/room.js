const mongoose=require("mongoose")

const roomSchema=mongoose.Schema({
    name: String,
    address: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    membersCount: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Number,default: Date.now},
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    id:false,
})

roomSchema.pre('save',function(){
    this.membersCount=this.members.length
})

module.exports=mongoose.model("Room",roomSchema)