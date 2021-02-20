const express=require('express')
const router=express.Router()
const User=require('../models/user')


router.get("/allUsers",async function(req,res){
    const users=await User.find({}).exec()
    res.send(users)
})

router.get("/user/:username",async function(req,res){
    const user=await User.findOne({username: req.params.username}).exec()
    if(!user) return res.status(400).send("User doesn't exist")

    res.send(user)
})

module.exports=router