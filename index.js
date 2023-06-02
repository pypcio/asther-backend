const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
morgan.token("data", (request, response) => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let locations = [
  {
    id: 1,
    city: "Wrocław",
    geoLocation: { lat: "51.23", lon: "17.23" },
  },
  {
    id: 2,
    city: "Kętrzyn",
    geoLocation: { lat: "54.079496", lon: "21.371970" },
  },
  {
    id: 3,
    city: "Olsztyn",
    geoLocation: { lat: "53.772939", lon: "20.471876" },
  },
  {
    id: 4,
    city: "Gdańsk",
    geoLocation: { lat: "54.361375", lon: "18.608992" },
  },
];
const createId = () => {
  return Math.random().toString(36).substring(2, 9);
};
//get location by id
app.get("/api/data/:id", (request, response) => {
  const findLocation = locations.find(
    (l) => l.id.toString() === request.params.id.toString()
  );
  response.send(findLocation);
});
//get all
app.get("/api/data", (request, response) => {
  response.send(locations);
});
//add new location
app.post("/api/data/", (request, response) => {
  const location = {
    id: createId(),
    createAt: Date.now(),
  };

  locations = locations.concat(location);
  response.send(location);
});
//update location
app.put("/api/data/:id", (request, response) => {
  const id = request.params.id.toString();
  const body = request.body;
  //   console.log("id ", typeof id, "body ", body);
  const updatedLocation = locations.find((l) => l.id.toString() === id);
  //   console.log("update: ", updatedLocation);
  if (updatedLocation) {
    const newLocation = {
      id: id,
      city: body.city,
      geoLocation: { lat: body.geoLocation.lat, lon: body.geoLocation.lon },
    };
    console.log("newLocation", newLocation);
    locations = locations.map((location) => {
      if (location.id.toString() === id) {
        return newLocation;
      }
      return location;
    });
    response.send(newLocation);
  } else {
    response.status(400).json({ error: "wrong id" });
  }

  console.log(updatedLocation);
});
//delete location
app.delete("/api/data/:id", (request, response) => {
  const deleted = locations.filter(
    (l) => l.id.toString() !== request.params.id.toString()
  );
  console.log("deleted", deleted);
});
const PORT = process.env.PORT || "8080";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
