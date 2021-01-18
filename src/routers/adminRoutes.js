const express = require("express")

const adminController = require("../controllers/adminController")
const { adminAuth } = require("../middleware/auth")

const router = express.Router()

router.post("/admin/login", adminController.adminLogin)
router.post("/admin/create-user", [adminAuth], adminController.createUser)

module.exports = router