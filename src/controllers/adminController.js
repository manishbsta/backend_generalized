const admin = require("../models/admin")
const user = require("../models/user")
const bcrypt = require("bcrypt")
var ObjectID = require("mongodb").ObjectID

exports.adminLogin = async (req, res) => {
    try {
        const currentUser = await admin.checkCrediantialsDb(
            req.body.email,
            req.body.password)

        const token = await currentUser.generateAuthToken()
        const userdetails = {
            token: token,
            _id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
            password: currentUser.password,
        }
        res.send({
            success: true,
            data: userdetails,
            error: {}
        })
    }
    catch (e) {
        res.send({
            success: false,
            data: {},
            error: "Invalid email or password!"
        })
    }
}

exports.createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
    }

    const User = new user(data)
    User.save().then(function (data) {
        res.send({
            success: true,
            data,
            error: {}
        })
    }).catch(error => {
        res.send({
            success: false,
            data: {},
            error
        })
    })
}