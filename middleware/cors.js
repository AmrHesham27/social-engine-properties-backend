const cors = async(req,res,next)=>{
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next()
    }
    catch(e){
        res.status(500).send({apiStatus:false, message:e.message})
    }
}

module.exports = cors