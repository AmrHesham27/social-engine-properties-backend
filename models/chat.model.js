const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    messages:[{
        // so that you know which user send this mesage 
        senderId:{
            type: String,
            trim: true,
            required: true
        },
        content:{
            type: String,
            trim: true,
            required:true
        }
    }],
    firstUserId:{
        type: String,
        trim: true,
        require: true
    },
    secondUserId:{
        type: String,
        trim: true,
        require: true
    }
},
{timestamps:true}
)

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat
