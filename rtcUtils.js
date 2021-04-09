const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
const User=require("./models/user")
const Room=require("./models/room")

const appID=process.env.AGORA_APP_ID
const appCertificate=process.env.AGORA_APP_CERTIFICATE
const role=RtcRole.PUBLISHER


//valid for a day
const expirationTimeInSeconds=3600*24 + Math.floor(Date.now()/1000)



async function generateRoomToken(username,roomAddress) {
    const user=await User.findOne({username:username})
                            .select('-_id name username image')
                            .exec()

    let userString=JSON.stringify(user)

    //replacing " since they are not allowed in agora, replace them back on client side
    userString=userString.replace(/\"/g,"#")

    //replacing '/'
    userString=userString.replace(/\//g,";")

    console.log("generateRoomToken: ${roomAddress}")

    const token=RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, roomAddress, userString, role, expirationTimeInSeconds)

    return {userString,token}
}


async function getRoom(address) {
    const room=await Room.findOne({address:address})
                            .select('_id name address image members owner createdAt')
                            .populate('members','-_id name username image email createdAt roomsCount')
                            .populate('owner','-_id name username image email createdAt roomsCount')
                            .exec()

    return room
}


module.exports={generateRoomToken, getRoom}