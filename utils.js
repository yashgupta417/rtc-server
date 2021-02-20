const Room=require("./models/room")

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
async function generateRoomAddress(){
    const chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const length=6
    let address;

    //looping until we get a unique Address
    while(1){
        address=""
        for(let i=0;i<length;i++){
            address+=chars[randomNum(0,61)]
        }
        const roomExist=await Room.findOne({address: address}).exec()
        if(!roomExist) break
    }
    return address
}

module.exports.generateRoomAddress=generateRoomAddress