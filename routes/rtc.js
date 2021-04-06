const express=require('express')
const router=express.Router()
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
const {generateRoomToken}=require("../rtcUtils")


router.get('/agora/token',async function(req,res){
    let {roomName, username}=req.query

    if(!roomName || !username) return res.status(400).send("roomName and username required")

    //generate room token
    const {userString,token}=await generateRoomToken(username,roomName)

    res.send({token: token, userString: userString})
})

module.exports=router