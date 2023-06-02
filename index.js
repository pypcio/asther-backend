const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const mongoose = require("mongoose");
const Location = require("./models/location.js");
const app = express();
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
// app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
// sync database

// const generateId = () => {
//   const newID = Math.random().toString(36).substring(2, 9);
//   return newID;
// };

//do wywalenia strona
// app.get("/", (req, res) => {
//   res.send("<h3>Hello</h3>");
// });
//GET all data from MongoDB
app.get("/api/data", (req, res) => {
  Location.find({}).then((location) => {
    res.json(location);
  });
});
//GET 1 person from MongoDB
app.get("/api/data/:id", (request, response, next) => {
  Location.findById(request.params.id)
    .then((findLocation) => {
      if (findLocation) {
        response.json(findLocation);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
//GET info about api

app.get("/api/info", (req, res) => {
  const time = new Date();
  Location.find({}).then((locations) => {
    res.send(
      `<p>Asther has info for ${locations.length} locations</p> <br/> <p>${time}</p>`
    );
  });
});

//create person, send to mongoDB and back to front using response.json()
app.post("/api/data", (request, response, next) => {
  // const body = request.body;
  // console.log("body", body);
  // if (body.name === undefined || body.number === undefined) {
  //   return response.status(400).json({ error: "content is missing" });
  // }
  const newLocation = new Location({ createdAt: Date.now() });
  newLocation
    .save()
    .then((savedLocation) => {
      response.json(savedLocation);
    })
    .catch((error) => next(error));
});
//delete
app.delete("/api/data/:id", (request, response, next) => {
  Location.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
//update
app.put("/api/data/:id", (request, response, next) => {
  const body = request.body;
  const updateObject = { ...body };
  Location.findByIdAndUpdate(request.params.id, updateObject, { new: true })
    .then((updatedLocation) => {
      response.json(updatedLocation);
    })
    .catch((error) => next(error));
});
//out of route
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
//error handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
