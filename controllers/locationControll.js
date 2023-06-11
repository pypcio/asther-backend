const Location = require("../models/location");
const { Parser } = require("@json2csv/plainjs");
const getDownloads = (request, response, next) => {
  Location.find({})
    .then((result) => {
      const parser = new Parser();
      const csv = parser.parse(result);
      response.send(csv);
    })
    .catch((error) => next(error));
};
//GET all data from MongoDB
const getAllLocation = (req, res, next) => {
  Location.find({})
    .then((location) => {
      res.json(location);
    })
    .catch((error) => next(error));
};
//GET 1 person from MongoDB
const getOneLocation = (request, response, next) => {
  Location.findById(request.params.id)
    .then((findLocation) => {
      if (findLocation) {
        response.json(findLocation);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
};
//GET info about api
const getInfoLocation = (req, res) => {
  const time = new Date();
  Location.find({}).then((locations) => {
    res.send(
      `<p>Asther has info for ${locations.length} locations</p> <br/> <p>${time}</p>`
    );
  });
};
//create person, send to mongoDB and back to front using response.json()
const createLocation = (request, response, next) => {
  const newLocation = new Location({ createdAt: Date.now() });
  newLocation
    .save()
    .then((savedLocation) => {
      response.json(savedLocation);
    })
    .catch((error) => next(error));
};
//delete location
const deleteLocation = (request, response, next) => {
  Location.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
};
//update location
const updateLocation = (request, response, next) => {
  const body = request.body;
  const updateObject = { ...body };
  Location.findByIdAndUpdate(request.params.id, updateObject, { new: true })
    .then((updatedLocation) => {
      response.json(updatedLocation);
    })
    .catch((error) => next(error));
};

module.exports = {
  getDownloads,
  getAllLocation,
  getOneLocation,
  getInfoLocation,
  updateLocation,
  deleteLocation,
  createLocation,
};
