const user = require("../models/user")

exports.userLogin = async (req, res) => {
    try {
        const currentUser = await user.checkCrediantialsDb(
            req.body.email,
            req.body.password)

        const token = await currentUser.generateAuthToken()
        const userdetails =
        {
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
    catch (error) {
        res.send({
            success: false,
            data: {},
            error: "Invalid email or password!",
        })
    }
}
