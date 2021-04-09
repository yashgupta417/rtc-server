const Joi=require("joi")

const loginValidator=function(data){
    const schema=Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }).options({allowUnknown:true})

    return schema.validate(data).error
}

const signupValidator=function(data){
    const schema=Joi.object({
        name: Joi.string().required().trim().min(1).max(20).pattern(/^[a-zA-Z ]+$/,'name'),
        username: Joi.string().required().trim().min(3).max(20).pattern(/^\w+$/,'username'), // [a-zA-Z0-9_]
        password: Joi.string().required().trim().min(8).max(20),
        email: Joi.string().required().trim().email(),
    }).options({allowUnknown:true})

    return schema.validate(data).error
}

const createRoomvalidator=function(data){
    const schema=Joi.object({
        roomName: Joi.string().required().min(1).max(15),
        username: Joi.string().required(),
    })

    return schema.validate(data).error
}

module.exports.loginValidator=loginValidator
module.exports.signupValidator=signupValidator
module.exports.createRoomvalidator=createRoomvalidator