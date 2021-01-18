const document = require("../models/document")
var ObjectID = require("mongodb").ObjectID

exports.uploadDocument = (req, res) => {
    req.files.map(item => {
        const data = {
            image: item.filename,
            user: ObjectID(req.body.user)
        }
        const Document = new document(data)
        Document.save().then(function (data) {
            res.send({
                success: true,
                data,
                error: {}
            })
        }).catch(function (error) {
            res.send({
                success: false,
                data: {},
                error
            })
        })
    })
}