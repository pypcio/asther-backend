const User = require("../models/user.js");

//get 1 User
const getUser = (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  console.log("dane", id);
  User.findById(id)
    .then((user) => {
      response.json(user);
    })
    .catch((error) => next(error));
};
//get users
const getUsers = (request, response, next) => {
  User.find({})
    .then((user) => {
      response.json(user);
    })
    .catch((error) => next(error));
};
//delete user
const deleteUser = async (request, response, next) => {
  try {
    const deleteUser = await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

//get all location
const getUserLocations = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  try {
    const result = await User.findById(id);
    response.json(result.data);
  } catch (error) {
    next(error);
  }
};
//get one location
const getUserLocation = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  const locationId = request.params.locationId;
  try {
    const user = await User.findById(id);
    const getLocation = user.data.find((n) => n._id.toString() === locationId);
    response.json(getLocation);
  } catch (error) {
    next(error);
  }
};
//create one location
const createUserLocation = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  const newLocation = { location: { createdAt: Date.now() } };
  try {
    const user = await User.findById(id);
    user.data.push(newLocation);
    const saveUser = await user.save();
    response.json(newLocation);
  } catch (error) {
    next(error);
  }
};
//update one location
const updateUserLocation = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  const locationId = request.params.locationId;
  const { lat, lon, timezone, timezone_offset, current, hourly, daily, city } =
    request.body;
  try {
    const user = await User.findById(id);
    const locationIndex = user.data.findIndex((n) => (n._id = locationId));
    user.data[locationIndex].location.city = city;
    user.data[locationIndex].location.lat = lat;
    user.data[locationIndex].location.lon = lon;
    user.data[locationIndex].location.timezone = timezone;
    user.data[locationIndex].location.timezone_offset = timezone_offset;
    user.data[locationIndex].location.current = current;
    user.data[locationIndex].location.hourly = hourly;
    user.data[locationIndex].location.daily = daily;
    const saveUpdatedLocation = await user.save();
    response.json(user.data[locationIndex]);
  } catch (error) {
    next(error);
  }
};
//delete one location
const deleteUserLocation = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  const locationId = request.params.locationId;
  try {
    const user = await User.findById(id);
    user.data = user.data.filter((n) => n._id.toString() !== locationId);
    const deleteLocation = await user.save();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  getUserLocations,
  getUserLocation,
  deleteUserLocation,
  createUserLocation,
  updateUserLocation,
};
