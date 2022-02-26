const agentType = async(req,res,next)=>{
    try{
        let userType = req.user.userType
        if(userType !== 'agent') throw new Error('only agents can do that')
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:e.message})
    }
}

module.exports = agentType