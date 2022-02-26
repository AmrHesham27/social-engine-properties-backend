const activatedUser = async(req,res,next)=>{
    try{
            let user = req.user
        // check if user is activated
            if(!user.activated) throw new Error('user is not activated')
        // next() 
            next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:"user is not activated"})
    }
}

module.exports = activatedUser