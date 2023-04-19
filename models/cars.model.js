// Here we define the schema to work with Mongoose. We defined all the fields that will go into the documents
// what will be created, updated and pulled from the MongoDB
// database.

// Import the mongoose library
const mongoose = require("mongoose");

let CarsSchema = mongoose.Schema({
  model: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
    default: "unknown",
  },
});

//here we export the schema
module.exports = mongoose.model("Cars", CarsSchema);
