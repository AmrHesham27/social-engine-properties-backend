const User = require('./user.controller')
const propertyModel = require("../../models/property.model")

class Agent extends User {
    static addProperty = async(req, res) => {
        try{ 
            let newProperty
            if(req.files){
                let allImages = Object.values(req.files)
                let avatarPath = allImages.filter(i => {return i[0]['fieldname'] == 'avatar'})[0][0]['path']
                let galleryArray = allImages.filter(i => {return i[0]['fieldname'] == 'gallery'})[0]
                let galleryPaths = galleryArray ? galleryArray.map(i => i['path']) : []
                newProperty = new propertyModel({
                    name: req.body.name,
                    propType: req.body.propType,
                    rentOrBuy: req.body.rentOrBuy,
                    price: req.body.price,
                    address: req.body.address,
                    governorate: req.body.governorate,
                    description: req.body.description,

                    agentId: req.user._id,

                    avatar: avatarPath,
                    gallery: galleryPaths,
                })
            }
            else {
                newProperty = new propertyModel({
                    name: req.body.name,
                    propType: req.body.propType,
                    rentOrBuy: req.body.rentOrBuy,
                    price: req.body.price,
                    address: req.body.address,
                    governorate: req.body.governorate,
                    description: req.body.description,
                    
                    agentId: req.user._id
                })
            }
            await newProperty.save()
            res.status(200).send({apiStatus:true, data:newProperty, message:"new property was added"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add new property"})
        }
    }
    static deleteProperty = async(req, res)=>{
        try{
            let user = req.user
            let propId = req.params.id
            await propertyModel.deleteOne({_id:propId})
            res.status(200).send({apiStatus:true, data: user, message:"property was deleted"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not delete property"})
        }
    }
    static showMyProperties = async(req, res) => {
        try{
            let user = req.user
            await user.populate("agentProps")
            res.status(200).send({apiStatus:true, data:user.agentProps, message:"properties were fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not fetch properties"})
        }
    }
}

module.exports = Agent