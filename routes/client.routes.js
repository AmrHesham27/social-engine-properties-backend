const router = require('express').Router()
const clientController = require("../app/controller/client.controller")
const auth = require("../middleware/authUser")
const active = require("../middleware/authUser")
const clientType = require("../middleware/clientType")
const { body } = require('express-validator');

router.post("/addFavProp",
    auth,
    clientType,
    active,
    body('propId').isNumeric(),
    clientController.addFavProp
)

router.delete("/deleteFavProp/:id", 
    auth, 
    clientType, 
    active,
    body('propId').isNumeric(), 
    clientController.deleteFavProp
)

router.get("/showAllFav", auth, clientType, active, clientController.showAllFav)

module.exports = {
    path: '',
    router
}