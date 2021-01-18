const express = require("express")

const userController = require("../controllers/userController")
const documentController = require("../controllers/documentController")
const { userAuth } = require("../middleware/auth")
const upload = require("../middleware/upload")

const router = express.Router()

router.post("/user/login", userController.userLogin)
router.post("/upload", [userAuth, upload],
    documentController.uploadDocument)

module.exports = router