const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name: String,
    username: String,
    image: String,
    password: String,
    email: String,
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref:'Room'}],
    roomsCount: Number,
    createdAt: {type: Number,default: Date.now},
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    id:false,
})

userSchema.pre('save',function(){
    this.roomsCount=this.rooms.length
})

module.exports=mongoose.model("User",userSchema)