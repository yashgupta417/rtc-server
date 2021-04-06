const Room=require("../models/room")
const Message=require("../models/message")
const User=require("../models/user")
const {generateRoomToken}=require("../rtcUtils")


async function getRoom(address) {
    const room=await Room.findOne({address:address})
                            .select('_id name address image members owner createdAt')
                            .populate('members','-_id name username image email createdAt roomsCount')
                            .populate('owner','-_id name username image email createdAt roomsCount')
                            .exec()

    return room
}



module.exports=(io)=>{
    const joinRoom=async function(address,username,cb){
        const socket=this

        //join room
        socket.join(address)
        console.log(socket.rooms)

        //get all messages
        const room=await getRoom(address)
        const messages=await Message.find({to:room._id})
                                .populate('sender','-_id name username image email createdAt roomsCount')
                                .exec()

        //generate room token
        const {userString,token}=await generateRoomToken(username,room.name)

        //trigger callback
        cb(messages,room,token,userString)
    }

    const sendMessage=async function(text, username, address,cb,localId=""){
        const socket=this
        
        const sender=await User.findOne({username:username}).exec()
        const to=await Room.findOne({address:address}).exec()

        let message=await Message.create({
            text:text,
            sender: sender._id,
            to: to._id,
        })

        console.log(message.text);
        console.log(localId);

        message=await Message.findOne(message)
                .populate('sender','-_id name username image email createdAt roomsCount')
                .exec()
  
        socket.to(address).emit('receiveMessage',message)

        cb({status: "sent"})
    }

    return {
        joinRoom,
        sendMessage,
    }
}