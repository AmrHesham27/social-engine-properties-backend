const router = require('express').Router()
const clientController = require("../app/controller/client.controller")
const auth = require("../middleware/authUser")
const active = require("../middleware/authUser")
const clientType = require("../middleware/clientType")

router.post("/addFavProp", auth, clientType, active, clientController.addFavProp) 
router.delete("/deleteFavProp/:id", auth, clientType, active, clientController.deleteFavProp)
router.get("/showAllFav", auth, clientType, active, clientController.showAllFav) 

module.exports = {
    path: '',
    router
}