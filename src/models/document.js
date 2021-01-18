const mongoose = require("mongoose")
const Schema = mongoose.Schema

const document = mongoose.model("Document", {
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = document