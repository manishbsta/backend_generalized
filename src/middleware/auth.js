const jwt = require('jsonwebtoken')
const User = require("../models/user")
const Admin = require("../models/admin")

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'user-token')
        const user = await User.findOne({
            _id: decoded._id, 'token': token
        })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication Failed!' })
    }
}

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'admin-token')
        const admin = await Admin.findOne({
            _id: decoded._id, 'tokens.token': token
        })
        if (!admin) {
            throw new Error()
        }
        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication Failed!' })
    }
}

module.exports = {
    userAuth,
    adminAuth
}