const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const auth = async(req,res,next)=>{
    try{
        // get the token from header and verfiy it
            const token = req.header("Authorization").replace("bearer ","")
            const myDecodedToken = jwt.verify(token, "123") //{_id, iat}
        // find user
            const user = await userModel.findOne({
                _id:myDecodedToken._id, 
                "tokens.token":token
            })
            if(!user) throw new Error("unauthorized")
        // send user and tken in the request 
            req.user = user
            req.token = token
        // next() 
            next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e.message, message:"unauthorized"})
    }
}

module.exports = auth