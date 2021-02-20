const User=require("./models/user")
const Room=require("./models/room")
const mongoose=require("mongoose")

//connecting to DB
mongoose.connect("mongodb://localhost:27017/rtc-db",{useNewUrlParser: true, useUnifiedTopology:true})

async function seedDB(){
    await User.deleteMany({})
    await Room.deleteMany({})
}

seedDB()
console.log("DB seeded successfully.")