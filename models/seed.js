////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const mongoose = require("./connection");
const Animal = require("./animal");
const User = require("./user");
const bcrypt = require("bcryptjs");

////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on("open", () => {
  // Run database queries in this function

  // create array of starter
  const startAnimal = [
    { name: "Tiger", extinct: "false", location: "Zoo", color: "orange", lifeExpectancy: 20, username: "test" },
    { name: "Monkey", extinct: "false", location: "Zoo", color: "brown", lifeExpectancy: 20, username: "test" }
  ];

  const starterUser = {
    username: "test",
    password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
  };

  // Delete all 
  Animal.deleteMany({username: "test"}, (err, data) => {
    //seed starter 
    User.create(starterUser, (err, user) => {
      Animal.create(startAnimal, (err, animal) => {
        console.log(animal);
        mongoose.connection.close();
      });
    });
  });
});