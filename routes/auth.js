const express=require('express')
const router=express.Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {loginValidator, signupValidator}=require('../validation')

router.post('/login',async function(req,res){
    const loginDetails={username: req.body.username, password: req.body.password}
    
    //validating data
    const error=loginValidator(loginDetails)
    if(error) return res.status(400).send(error.details[0].message)

    //checking user exist
    const user=await User.findOne({username: loginDetails.username}).exec()
    if(!user) return res.status(400).send("Username doesn't exist.")

    //checking password is correct or not
    const match=await bcrypt.compare(loginDetails.password, user.password)
    if (!match) return res.status(401).send("Invalid details.")

    //Assiging a token
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)

    //sending response
    res.send({token: token})
})

router.post('/signup',async function(req,res){

    //validating user data
    const error=signupValidator(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if username already taken
    let usernameExist=await User.findOne({username: req.body.username}).exec()
    if(usernameExist) return res.status(400).send("Username not available")

    //checking if email already registered
    let emailExist=await User.findOne({email:req.body.email}).exec()
    if(emailExist) return res.status(400).send("Account already exist with the given email")

    //hashing  password
    const salt=await bcrypt.genSalt(10)
    hashedPassword=await bcrypt.hash(req.body.password,salt)

    //registering user
    let newUser=new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        image: null,
        password: hashedPassword,
    })
    await newUser.save()


    //sending response
    res.send({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
        createdAt: newUser.createdAt,
        roomsCount: newUser.roomsCount,
    })
})

module.exports=router