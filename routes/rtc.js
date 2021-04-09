const express=require('express')
const router=express.Router()
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
const {generateRoomToken, getRoom}=require("../rtcUtils")


router.get('/rtc/token',async function(req,res){
    let {roomAddress, username}=req.query

    if(!roomAddress || !username) return res.status(400).send("roomAddress and username required")

    
    const room=await getRoom(roomAddress)
    if(!room) return res.status(400).send("invalid address")

    //generate room token
    const {userString,token}=await generateRoomToken(username,roomAddress)

    res.send({token: token, userString: userString})
})

module.exports=router