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
                            .select('-_id name username email createdAt roomsCount')
                            .exec()
    if(!user) return res.status(400).send("User doesn't exist")

    res.send(user)
})

router.get("/user/:username/rooms",async function(req,res){
    const user=await User.findOne({username:req.params.username})
                        .populate({
                            path:'rooms',
                            select:'-_id name address createdAt membersCount',
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

module.exports=router