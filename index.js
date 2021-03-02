const express=require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")


//Configuring dotenv
require('dotenv').config()


//for handling POST requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//connecting to DB
const uri=process.env.DATABASE_URI || "mongodb://localhost:27017/rtc-db"
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true},()=>{
    console.log("DB connected.")
})
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")
const roomRoutes=require("./routes/room")
const agoraRoutes=require("./routes/agora")

app.use(authRoutes)
app.use(userRoutes)
app.use(roomRoutes)
app.use(agoraRoutes)

app.get("/",function(req,res){
    res.send("RTC")
})

app.get("*",function(req,res){
    res.status(404).send("Not Found")
})

//will use .env PORT during production and 3000 during development
const port=process.env.PORT || 3000

app.listen(port,function(){
    console.log("Server is running...")
})