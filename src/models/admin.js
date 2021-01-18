const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

// login credentials checker function
AdminSchema.statics.checkCrediantialsDb = async (email, password) => {
    const adminCheck = await admins.findOne({ email, password })
    return adminCheck
}

// login token generator function
AdminSchema.methods.generateAuthToken = async function () {
    const adminAuth = this
    const token = jwt.sign({ _id: adminAuth._id.toString() }, 'admin-token')

    adminAuth.tokens = adminAuth.tokens.concat({ token: token })
    await adminAuth.save()
    return token
}

// database model 
const admins = mongoose.model('Admin', AdminSchema)
module.exports = admins