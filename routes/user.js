const express=require('express')
const router=express.Router()
const User=require('../models/user')


//For debugging use only
router.get("/allUsers",async function(req,res){
    const users=await User.find({}).exec()
    res.send(users)
})


router.get("/user/:username",async function(req,res){
    const user=await User.findOne({username: req.params.username})
                            .select('-_id name username email image createdAt roomsCount')
                            .exec()
    if(!user) return res.status(400).send("User doesn't exist")

    res.send(user)
})

router.get("/user/:username/rooms",async function(req,res){
    const user=await User.findOne({username:req.params.username})
                        .populate({
                            path:'rooms',
                            select:'-_id name address image createdAt membersCount',
                            // populate:[{
                            //     path:'owner',
                            //     select:' ',
                            // },
                            // {
                            //     path:'members',
                            //     select:'',
                            // }]
                        })
                        .exec()
    if(!user) return res.status(400).send("User doesn't exsit")
    console.log(user)
    res.send(user.rooms)
})




router.patch("/user/:username",async function(req,res){
    const username=req.params.username
    const updates=req.body
    
    //update the user
    const user=await User.findOneAndUpdate({username:username},{$set: updates},{new:true}).exec()

    //update unsuccessfull
    if(!user) return res.status(400).send("update unsucessfull")
    
    //send back response
    res.send({
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
        roomsCount: user.roomsCount,
    })
})

const upload=require("../upload")

router.patch('/user/:username/image',upload.single('image'),async function(req,res){
    const file=req.file
  
    //if upload unsuccessfull
    if(!file) return res.status(400).send("File not uploaded")
  
    const username=req.params.username
    
    //update the user
    const user=await User.findOneAndUpdate({username:username},{$set: {image: file.location}},{new:true}).exec()

    //update unsuccessfull
    if(!user) return res.status(400).send("update unsucessfull")
    
    //send back response
    res.send({
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
        roomsCount: user.roomsCount,
    })
})
  
  

module.exports=router