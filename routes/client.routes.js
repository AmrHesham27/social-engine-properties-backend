const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require("../middleware/authUser")
const active = require("../middleware/authUser")
const clientType = require("../middleware/clientType")

router.post("/addFavProp", auth, clientType, active, userController.addFavProp) 
router.delete("/deleteFavProp/:id", auth, clientType, active, userController.deleteFavProp)
router.get("/showAllFav", auth, clientType, active, userController.showAllFav) 

module.exports = {
    path: '',
    router
}