const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require("../middleware/authUser")
const active = require("../middleware/authUser")
const clientType = require("../middleware/clientType")
const agentType = require("../middleware/agentType")
const {singleUpload, manyUploads} = require('../middleware/multer')

// no middleware needed 
router.get("/", ()=>{console.log("app is working")})
router.post("/register", userController.addUser)
router.post("/login", userController.login)
router.post("/forgotPassword", userController.forgotPassword) 
router.post("/sendNewPassword/:otp/:email", userController.sendNewPassword)
router.get("/showProperty/:id", userController.showProperty)
router.post("/search", userController.search)

// logged in 
router.post("/logout", auth, userController.logout)
router.post("/logoutAll", auth, userController.logoutAll)
router.get("/sendOtp", auth, userController.sendOtp)
router.post("/activate", auth, userController.activateUser)

// logged in and activated
router.post("/changePassword", auth, active, userController.changePassword)
router.post("/edit", auth, active, userController.editUser)
router.post("/addAvatar", auth, active, singleUpload, userController.addImage)
router.delete("/deleteMyAccount", auth, active, userController.deleteMyAccount)
router.get("/me", auth, active, userController.me)
router.post('/changeEmail', auth, active, userController.changeEmail) 
router.post('/confirmChangeEmail', auth, active, userController.confirmChangeEmail) 
router.post("/sendMssg", auth, active, userController.sendMssg) 
router.post("/getMssgs", auth, active, userController.getMssgs)

// client only routes 
router.post("/addFavProp", auth, clientType, active, userController.addFavProp) 
router.delete("/deleteFavProp/:id", auth, clientType, active, userController.deleteFavProp)
router.get("/showAllFav", auth, clientType, active, userController.showAllFav) 

// agent only routes
router.post("/showMyProperties", auth, agentType, active, userController.showMyProperties)
router.post("/addProperty", auth, agentType, active, manyUploads, userController.addProperty)
router.delete("/deleteProperty/:id", auth, agentType, active, userController.deleteProperty)

module.exports = router
