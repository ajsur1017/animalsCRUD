
////////////////////////////////////
// Import all our dependencies
/////////////////////////////////////
require("dotenv").config() // load env vars
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const methodOverride = require("method-override")
const AnimalRouter = require("../controllers/animal")
const UserRouter = require("../controllers/user")
const HomeRouter = require("../controllers/home")
const session = require('express-session')
const MongoStore = require("connect-mongo")

//////////////////////////////////////////
// Middleware Function
///////////////////////////////////////////

const middleware = (app) => {
    app.use(morgan("tiny")) // logging
    app.use(methodOverride("_method")) // override for puts and deletes
    app.use(express.urlencoded({extended: true})) // parse request body
    app.use(express.static("public")) // serve files statically from public folder
    app.use(session({
        secret: process.env.SECRET,
        store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
        saveUninitialized: true,
        resave: false
    }))
    app.use("/animal", AnimalRouter)
    app.use("/user", UserRouter) // "/user/signup" & "/user/login"
    app.use("/", HomeRouter)
}

// export function
module.exports = middleware
