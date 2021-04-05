const express=require("express")
const app=express()
const httpServer=require("http").createServer(app)
const io=require("socket.io")(httpServer)
const mongoose=require("mongoose")
const bodyParser=require("body-parser")

const path=require('path')
app.use(express.static(path.join(__dirname, 'public')))

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
const { join } = require("path")


app.use(authRoutes)
app.use(userRoutes)
app.use(roomRoutes)


app.get("/",function(req,res){
    res.send("RTC")
})

app.get("*",function(req,res){
    res.status(404).send("Not Found")
})


const {joinRoom, sendMessage}=require("./eventHandlers/chat")(io)

//socket
io.on("connection",(socket)=>{

    socket.on("joinRoom",joinRoom)
    socket.on("sendMessage",sendMessage)
    
})

//will use .env PORT during production and 3000 during development
const port=process.env.PORT || 3000


httpServer.listen(port,function(){
    console.log("Server is running...")
})
//app.listen() is replaces with httpServer.listen()