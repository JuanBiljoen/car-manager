//importing necassary libraries
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// Load the routes file to be able to use it
const apiRoutes = require("./routes");

// Import mongoose to be used to connect to the MongoDB database
const mongoose = require("mongoose");

// Create the app object from the top-level express function call
// to initialize the express app
const app = express();

// MIDDLEWARES
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'"],
    },
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.use("/api", apiRoutes);

// ERROR HANDLING
app.get("*", function (req, res, next) {
  let err = new Error();

  err.statusCode = 404;

  err.shouldRedirect = true;
  next(err);
});

// I placed error handling middleware at the end to catch all errors
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Oops something is wrong!?!?");
});

// DYNAMIC PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`App server is listening on PORT ${PORT}`);
});

// MONGOOSE CONNECTION
const uri = `mongodb+srv://admin:admin@clusterofcars.ibwz8yk.mongodb.net/carlist?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;

mongoose.connect(uri);

mongoose.connection.on("error", function (err) {
  console.log("Hurray!! Connection to Mongo established.");
  console.log(
    "Something went wrong!! Could not connect to the database. Exiting now..."
  );
  console.log(err);
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to MongoDB database");
});
