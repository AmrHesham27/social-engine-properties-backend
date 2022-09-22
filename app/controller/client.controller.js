const User = require('./user.controller')
const propertyModel = require("../../models/property.model")

class Client extends User {
    static addFavProp = async(req, res)=>{
        try{
            this.checkErrors()

            let user = req.user
            let propId = req.body.propId
            let property = await propertyModel.findOne({_id:propId})
            if(!property) throw new Error('could not find this prop')
            // did user liked this property before?
            if(user.favourites.includes(propId)){ 
                res.status(200).send({apiStatus:true, data:user, message:"user already like this property"})
            }
            else {
                property.noOfFav += 1
                user.favourites.push(propId)
                await property.save()
                await user.save()
                res.status(200).send({apiStatus:true, data:propId, message:"favourite property was added"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add favourite property"})
        }
    }
    static showAllFav = async(req, res)=>{
        try{
            let userAllFav = req.user.favourites
            let properties = await propertyModel.find({_id: userAllFav })
            res.status(200).send({apiStatus:true, data:properties, message:"favourites were fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add fetch favourites"})
        }
    }
    static deleteFavProp = async(req, res)=>{
        try{
            this.checkErrors()
            
            let user = req.user
            let propId = req.params.id
            user.favourites = user.favourites.filter(i => i != propId)
            await user.save()
            res.status(200).send({apiStatus:true, data: user, message:"favourite property was deleted"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not delete favourite property"})
        }
    }
}

module.exports = Client