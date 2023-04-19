// Import the express library
const express = require("express");

const apiRouter = express.Router();

// Import the cars controller
const cars = require("../controllers/cars.controller.js");

// ROUTERS

// POST Request 
apiRouter.post("/addCar", cars.createCar);

// PUT Request for a single car
apiRouter.put("/updateSingleCar/:id", cars.updateSingleCar);

// PUT Request to Update Information on Multiple Cars
apiRouter.put("/updateMultipleCars", cars.updateMultipleCars);

// DELETE Request to delete a specific document of a car
apiRouter.delete("/deleteCar/:id", cars.deleteCar);

//  GET Request to access the list of all cars
apiRouter.get("/", cars.findAllCars);

// GET Request to access the list of all cars older
// than 5 years
apiRouter.get("/old", cars.findAllCarsOlderThan5Years);

// Exporting the module
module.exports = apiRouter;
