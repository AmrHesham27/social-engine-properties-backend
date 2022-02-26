const clientType = async(req,res,next)=>{
    try{
        let userType = req.user.userType
        if(userType !== 'client') throw new Error('only clients can do that')
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:e.message})
    }
}

module.exports = clientType