const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")
const findOrCreate = require('mongoose-find-or-create')

const userSchema = new mongoose.Schema({
    userType:{
        type:String,
        trim:true,
        enum:[ 'client', 'agent'],
    },
    name:{ //
        type:String,
        trim:true,
    },
    password:{
        type:String,
        minlength:6,
        trim:true,
    },
    email:{ //
        type:String,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format")
        }
    },
    newEmail:{
        type:String,
        trim:true
    }, //
    phoneNumber:{
        type:String,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isMobilePhone(value,"ar-EG")) throw new Error('invalid phone number')
        }
    }, 
    favourites:[{
        type:String,
        trim:true,
    }],
    notifications:[{
        type:String,
        trim:true,
    }],
    tokens:[{
        token:{
            type:String, 
            required:true
        }
    }],
    otp:{
        type:String,
        trim:true,
        default:Date.now()
    },
    activated:{
        type:Boolean,
        default:false
    }, 
    registerType:{
        type:String,
        enum:[ 'token', 'google', 'facebook'],
        default: 'token'
    },
    avatar:{ //
        type:String
    }
},
{timestamps:true}
)
//virtual relation with properties 
userSchema.virtual("agentProps", {
    ref:"Property",
    localField:"_id",
    foreignField:"agentId"
})

//handle response
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    /// what is the dufference between this and this.toObject() ???
    delete user.__v
    delete user.password
    delete user.tokens
    return user
}

//update save
userSchema.pre("save", async function(){
    const user = this
    // if user password was modified hash the new password
    if(user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)
})

/* 
notice here that we will use two ways to add functions to the schema, the first is (statics) and the second is (methods)
the difference between them is the same difference in oop , statics is used on the class and methods is used on class instance (model)
*/

//login user
userSchema.statics.loginUser = async(email,password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error("invalid user email")
    const isValid = await bcryptjs.compare(password, user.password)
    if(!isValid) throw new Error("invalid password")
    return user
}
//generate token
const jwt = require("jsonwebtoken")
userSchema.methods.generateToken = async function(){
    const user = this
    // generate new token every time the user sign in 
    // "123" is secret key should be put in file and read by fs.readFileSync
    const token = jwt.sign({_id:user._id}, "123", { expiresIn: '2h' }) 
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// find or create
userSchema.plugin(findOrCreate)

const User = mongoose.model("User", userSchema)
module.exports = User
