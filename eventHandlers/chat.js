const Room=require("../models/room")
const Message=require("../models/message")

module.exports=(io)=>{
    const joinRoom=async function(address,cb){
        const socket=this

        //join room
        socket.join(address)
        console.log(socket.rooms)

        //get all messages
        const room=await Room.findOne({address:address}).exec()
        const messages=Message.find({to:room._id})
                                .populate('sender','-_id name username image email createdAt roomsCount')
                                .exec()

        //trigger callback
        cb({messages})
    }

    const sendMessage=function(address, msg){
        const socket=this
        
        socket.to(address).broadcast.emit('receiveMessage',msg)
    }

    return {
        joinRoom,
        sendMessage,
    }
}