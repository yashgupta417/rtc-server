const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
const User=require("./models/user")

const appID=process.env.AGORA_APP_ID
const appCertificate=process.env.AGORA_APP_CERTIFICATE
const role=RtcRole.PUBLISHER


//valid for a day
const expirationTimeInSeconds=3600*24 + Math.floor(Date.now()/1000)



async function generateRoomToken(username,roomName) {
    const user=await User.findOne({username:username})
                            .select('-_id name username image')
                            .exec()

    let userString=JSON.stringify(user)

    //replacing " since they are not allowed in agora, replace them back on client side
    userString=userString.replace(/\"/g,"#")

    //replacing '/'
    userString=userString.replace(/\//g,";")

    const token=RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, roomName, userString, role, expirationTimeInSeconds)

    return {userString,token}
}

module.exports={generateRoomToken}