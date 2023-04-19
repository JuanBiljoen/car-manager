/*
  Here we define all the CRUD operations operations in the
  callback functions that will be called when the route
  end-points are hit by a request.
 */

// Import the Cars model from the model file
const Cars = require("../models/cars.model");

// Creating a new car in the database
exports.createCar = function (req, res) {
  // Grab the new car object from the body
  // Cars.insertMany([
  //   {make: "Toyota", model: "2013", color: "white", registrationNumber: "NW123", owner: "Piet Skiet", address: "Ian 14" },
  //   {make: "BMW", model: "2020", color: "red", registrationNumber: "CA356", owner: "John Doe", address: "Loop 156" },
  //   {make: "Isuzu", model: "2009", color: "grey", registrationNumber: "NW093", owner: "Jan Papier", address: "Boom 345" },
  //   {make: "Chev", model: "2019", color: "white", registrationNumber: "FS394", owner: "Sim Piwe", address: "Church 0022" },
  //   {make: "Toyota", model: "2003", color: "silver", registrationNumber: "NW992", owner: "Holly", address: "Oban 11002" }
  // ]).then(function(){
  //   console.log("inserted")
  //   res.send("inserted")
  // })

  const newCar = req.body;

  // Create and Save a new car using the Car Model constructor
  // and passing in the Object received from the body of the
  // request
  let carModel = new Cars({
    ...newCar,
  });

  // Calling the save method to create the Car
  carModel.save(function (err, doc) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Oops! There is an error in adding the car to the database.",
      });
    } else {
      console.log("Yay! New car has been added to database!!", doc);
      res.send(doc);
    }
  });
};

/* 
    2. Updating information about a single car.
    ------------------------------------------------------------
*/

exports.updateSingleCar = function (req, res) {
  // Grab the id of the car to be updated in the req params
  const id = String(req.params.id);

  // Grab the updated object
  const updatedFields = req.body;

  Cars.findByIdAndUpdate(
    id,
    { $set: { ...updatedFields } },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Oops! Something went wrong when updating data!");
        res.send("ERROR: Car has Not been Updated. " + err);
      }
      console.log("Yay! Car has been Updated!!", doc);
      res.send(doc);
    }
  );
};

/* 
    3. Updating information about more than one car.
    ------------------------------------------------------------
*/

exports.updateMultipleCars = function (req, res) {
  const { filterField } = req.body.filter;
  let { filterValue } = req.body.filter;
  const queryFilter = { [filterField]: filterValue };
  // Grab the actual data from the body of the req
  const updatedFields = req.body.data;

  // Updating Multiple docs
  Cars.updateMany(
    queryFilter,
    { $set: { ...updatedFields } },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log("Oops! Something went wrong when updating data!");
        res.send("ERROR: Cars have Not been Updated. " + err);
      }
      console.log("Yay! The Cars have been Updated!!!", docs);
      res.send(docs);
    }
  );
};


  //  Deleting a specific document.
   

exports.deleteCar = function (req, res) {
  // Grab the id of the car to be deleted in the req params
  const id = String(req.params.id);

  Cars.findByIdAndDelete(id, function (err, doc) {
    if (err) {
      console.log("ERROR: Car is NOT Deleted. " + err);
      res.send("ERROR: Car is NOT Deleted. " + err);
    }
    console.log("The car has been deleted!", doc);
    res.send(doc);
  });
};

    // 5. Listing all the information for all cars in the database
// Retrieving all the information for all cars in the database
exports.findAllCars = function (req, res) {
  Cars.find(function (err, carsDocs) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Oops! There is an error in retrieving cars from the database",
      });
    } else {
      res.send(carsDocs);
    }
  });
};
//finding old cars
exports.findAllCarsOlderThan5Years = function (req, res) {
  // We compute the year that is 5 Years Ago from today
  // We do this formula for maintainability instead of
  // hardcoding the actual Year which is five years ago
  const fiveYearsAgo = new Date().getFullYear() - 5;

  // Calling the find() method with the arguments
  Cars.find(
    { model: { $lt: fiveYearsAgo } },
    {
      model: true,
      make: true,
      registrationNumber: true,
      owner: true,
    },
    function (err, carsDocs) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message:
            "Oops! There is an error in retrieving cars older than 5 years from the database",
        });
      } else {
        res.send(carsDocs);
      }
    }
  );
};
