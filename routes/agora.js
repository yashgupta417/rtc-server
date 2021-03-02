const express=require('express')
const router=express.Router()
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

const appID=process.env.AGORA_APP_ID
const appCertificate=process.env.AGORA_APP_CERTIFICATE
const role=RtcRole.PUBLISHER

//valid for a day
const expirationTimeInSeconds=3600*24 + Math.floor(Date.now()/1000)



router.get('/agora/token',function(req,res){
    let {roomName, username}=req.query

    if(!roomName || !username) return res.status(400).send("roomName and username required")

    const token=RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, roomName, username, role, expirationTimeInSeconds)

    res.send({token: token})
})

module.exports=router