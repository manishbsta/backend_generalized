const multer = require("multer")
const path = require("path")

var storage = multer.diskStorage({
    destination: "./public/documents",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname)
        let imgname = req.user._id + "_" + Date.now() + ext

        callback(null, imgname)
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        return cb(newError("You can upload only image files!"), false);
    }
    cb(null, true)
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 5000000 }
}).array('image', 1)

module.exports = upload