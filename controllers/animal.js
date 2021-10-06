///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const e = require("express")
const express = require("express")
const Animal = require("../models/animal")

///////////////////////////////////////
// create router
///////////////////////////////////////
const router = express.Router()
///////////////////////////////////////
// router middleware
///////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect("/user/login")
    }
})

///////////////////////////////////////
// routes
///////////////////////////////////////

// Index Route (Get => /animal)
router.get("/", (req, res) => {
    Animal.find({ username: req.session.username }, (err, animal) => {
        res.render("animal/index.ejs", { animal })
    })
})

// New Route (Get => /animal/new)
router.get("/new", (req, res) => {
    res.render("animal/new.ejs")
})

router.post("/", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    req.body.username = req.session.username
    Animal.create(req.body, (err, animal) => {
       res.redirect("/animal")
    })
})

// The Edit Route (Get => /animal/:id/edit)
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animal/edit.ejs", { animal })
    })

})

// THe Update Route (PUT => /animal/:id)
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.findByIdAndUpdate(id, req.body, { new: true }, (err, animal) => {
        res.redirect("/animal")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animal) => {
        res.redirect("/animal")
    })
})

// THe Show (GET => /animal/:id)
router.get("/:id", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animal/show.ejs", { animal })
    })
})

///////////////////////////////////////
// export the router
///////////////////////////////////////
module.exports = router