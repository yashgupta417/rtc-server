const Joi=require("joi")

const loginValidator=function(data){
    const schema=Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    return schema.validate(data).error
}

const signupValidator=function(data){
    const schema=Joi.object({
        username: Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(8).max(20),
        email: Joi.string().required().email(),
    })

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