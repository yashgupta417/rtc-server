const User=require("./models/user")
const Room=require("./models/room")
const mongoose=require("mongoose")




async function seedDB(){
    try{
        //connecting to DB
        await mongoose.connect("mongodb://localhost:27017/rtc-db",{useNewUrlParser: true, useUnifiedTopology:true})
        
        await User.deleteMany({})
        await Room.deleteMany({})
        console.log("DB seeded successfully.")
    }catch(err){
        console.log(err)
    }
}

seedDB()
