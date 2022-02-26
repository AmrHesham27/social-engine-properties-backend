const mongoose = require("mongoose")
const propertySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    governorate:{
        type: String,
        enum: ["Cairo", "Alexandria", "Giza"],
        required: true
    },
    address:{
        type:String,
        trim:true,
        required:true,
    },
    price:{
        type:Number,
        trim:true,
        required:true,
    },
    rentOrBuy:{
        type:String,
        enum:["rent", "buy"],
        trim:true,
        required:true,
    },
    propType:{
        type:String,
        enum:['Apartment', 'Duplex', 'Villa', 'Compound'],
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        required: true
    },
    gallery:[{
        type:String
    }],
    // next values will not be entered by agent
    agentId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    noOfViews:{
        type:Number,
        default:0
    },
    macAdressList:[{
        time:{type:String},
        mac:{type:String}
    }],
    noOfFav:{
        type:Number,
        default:0
    }
},
{timestamps:true}
)

const Property = mongoose.model("Property", propertySchema)
module.exports = Property