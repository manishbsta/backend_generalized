const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        index: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    }
})

// login credentials checker function
UserSchema.statics.checkCrediantialsDb = async (email, password) => {
    const user = await users.findOne({ email })
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        return user
    }
}

// login token generator function
UserSchema.methods.generateAuthToken = async function () {
    const userAuth = this
    const token = jwt.sign({ _id: userAuth._id.toString() }, 'user-token')

    userAuth.token = token
    await userAuth.save()
    return token
}

// database model 
const users = mongoose.model('User', UserSchema)
module.exports = users