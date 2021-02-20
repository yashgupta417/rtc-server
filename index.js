const express=require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const seedDB=require("./seed")


//Configuring dotenv
require('dotenv').config()


//for handling POST requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//connecting to DB
mongoose.connect("mongodb://localhost:27017/rtc-db",{useNewUrlParser: true, useUnifiedTopology:true},()=>{
    console.log("DB connected.")

    //resetting dataset
    //seedDB()
})
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")

app.use(authRoutes)
app.use(userRoutes)

app.get("/",function(req,res){
    res.send("RTC")
})

app.get("*",function(req,res){
    res.status(404).send("Not Found")
})

app.listen(3000,function(){
    console.log("Server is running...")
})