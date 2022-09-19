const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require("../middleware/authUser")
const active = require("../middleware/authUser")
const agentType = require("../middleware/agentType")
const { manyUploads } = require('../middleware/multer')

// agent only routes
router.post("/showMyProperties", auth, agentType, active, userController.showMyProperties)
router.post("/addProperty", auth, agentType, active, manyUploads, userController.addProperty)
router.delete("/deleteProperty/:id", auth, agentType, active, userController.deleteProperty)

module.exports = {
    path: '',
    router
}