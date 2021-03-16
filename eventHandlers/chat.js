const Room=require("../models/room")
const Message=require("../models/message")
const User=require("../models/user")

module.exports=(io)=>{
    const joinRoom=async function(address,cb){
        const socket=this

        //join room
        socket.join(address)
        console.log(socket.rooms)

        //get all messages
        const room=await Room.findOne({address:address}).exec()
        const messages=await Message.find({to:room._id})
                                .populate('sender','-_id name username image email createdAt roomsCount')
                                .exec()

        //trigger callback
        cb(messages)
    }

    const sendMessage=async function(text, username, address,cb){
        const socket=this
        
        const sender=await User.findOne({username:username}).exec()
        const to=await Room.findOne({address:address}).exec()

        let message=new Message({
            text:text,
            sender: sender._id,
            to: to._id,
        })
        await message.save()
        socket.to(address).emit('receiveMessage',message)

        cb({status: "sent"})
    }

    return {
        joinRoom,
        sendMessage,
    }
}