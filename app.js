require("./src/database/connection")
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()

const userRoutes = require("./src/routers/userRoutes")
const adminRoutes = require("./src/routers/adminRoutes")

//use body-parser to post data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//set public directory
const publicdirectory = path.join(__dirname, "public");
app.use(express.static(publicdirectory))

//config all the routes
app.use(userRoutes)
app.use(adminRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})