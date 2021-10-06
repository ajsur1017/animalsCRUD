// import the connected mongoose object
const mongoose = require("./connection")
////////////////////////////////////
// Our Model
////////////////////////////////////
const { Schema, model } = mongoose
const userSchema = new Schema({
    username: {type: String, required: true, unique: true}, // unique is database wide
    password: {type: String, require: true}
})
const User = model("User", userSchema)
// export the model
module.exports = User