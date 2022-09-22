const router = require('express').Router()
const agentController = require("../app/controller/agent.controller")
const auth = require("../middleware/authUser")
const active = require("../middleware/authUser")
const agentType = require("../middleware/agentType")
const { manyUploads } = require('../middleware/multer')

// agent only routes
router.post("/showMyProperties", auth, agentType, active, agentController.showMyProperties)
router.post("/addProperty", auth, agentType, active, manyUploads, agentController.addProperty)
router.delete("/deleteProperty/:id", auth, agentType, active, agentController.deleteProperty)

module.exports = {
    path: '',
    router
}