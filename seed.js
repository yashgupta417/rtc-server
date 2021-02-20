const User=require("./models/user")

async function seedDB(){
    await User.deleteMany({})
}

module.exports=seedDB