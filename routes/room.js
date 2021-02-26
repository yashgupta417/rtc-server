const express=require('express')
const Room=require("../models/room")
const User=require("../models/user")
const router=express.Router()
const {createRoomvalidator}=require("../validation")
const {generateRoomAddress}=require("../utils")

router.post("/createRoom",async function(req,res){
    //validating data
    const error=createRoomvalidator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //generating Room Address
    const address= await generateRoomAddress()

    //finding user
    const user=await User.findOne({username: req.body.username}).exec()

    //checking user exists
    if(!user) return res.status(400).send("Username doesn't exist.")

    //creating new Room
    let newRoom=await Room.create({address: address,
                                    name: req.body.roomName,
                                    owner: user._id,
                                    members: [user._id]})

    //adding room refernce to the current user
    user.rooms.push(newRoom._id)
    await user.save()
                     
    //sending back response
    res.send({
        address:newRoom.address,
        name: newRoom.name,
        membersCount: newRoom.membersCount,
        createdAt: newRoom.createdAt,
    })
})

router.get("/joinRoom",async function(req,res){
    //Finding room and the user
    let room=await Room.findOne({address:req.query.address}).exec()
    let user=await User.findOne({username: req.query.username}).exec()

    //handling Bad request
    if(!room || !user) return res.sendStatus(400)

    //checking if user is already a member of the room
    const alreayJoined=room.members.find(member=>member.equals(user._id))
    if(alreayJoined) return res.status(400).send("Already a member of the room.")


    //adding user to the room
    room.members.push(user._id)
    await room.save()

    //adding room refernce to the user
    user.rooms.push(room._id)
    await user.save()

    //sending back response
    res.send({
        address:room.address,
        name: room.name,
        membersCount: room.membersCount,
        createdAt: room.createdAt,
    })

})

router.get("/room/:address",async function(req,res){
    const room=await Room.findOne({address: req.params.address})
                            .select('-_id name address members owner createdAt')
                            .populate('members','-_id name username email createdAt roomsCount')
                            .populate('owner','-_id name username email createdAt roomsCount')
                            .exec()

    if (!room) return res.status(400).send("Room doesn't exist")

    res.send(room)
})

module.exports=router