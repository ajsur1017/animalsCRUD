///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
///////////////////////////////////////
// Create Router
///////////////////////////////////////
const router = express.Router();
///////////////////////////////////////
// Routes
///////////////////////////////////////

// The Signup Routes (GET => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})
router.post("/signup", async (req, res) => {
    // hashing password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        res.redirect("/user/login")
    })
})
// the Login Routes (GET => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        // checking if userexists
        if (!user) {
            res.send("user doesn't exist");
        } else {
            //check if password matches
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                res.redirect("/animal");
            } else {
                res.send("wrong password");
            }
        }
    });
});
// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
});
///////////////////////////////////////
// Export the Router
///////////////////////////////////////
module.exports = router
