const User = require("../models/user.js");
const { matchSorter } = require("match-sorter");
const mongoose = require("mongoose");
//get 1 User
const getUser = (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  // console.log("dane", id);
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
    // console.log("dane: ", result.data);
    // if (query) {
    //   result = matchSorter(result, query, { keys: ["city"] });
    // }
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
  const newLocation = {
    location: { createdAt: Date.now() },
  };
  try {
    const user = await User.findById(id);
    user.data.push(newLocation);
    const saveUser = await user.save();
    const locationIndex = saveUser.data.findIndex(
      (n) => n.location.createdAt === newLocation.location.createdAt
    );
    response.json(saveUser.data[locationIndex]);
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
  // console.log("locationId", locationId);
  const { lat, lon, timezone, timezone_offset, current, hourly, daily, city } =
    request.body;
  try {
    const user = await User.findById(id);
    const locationIndex = user.data.findIndex(
      (n) => n._id.toString() === locationId
    );
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
//update all locations
const updateAllUserLocations = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  updatedArray = request.body;
  // console.log("updatedArray", updatedArray);
  try {
    const user = await User.findById(id);
    if (updatedArray.length !== 0) {
      for (let i = 0; i < user.data.length; i++) {
        if (user.data[i].location.city !== undefined) {
          user.data[i].location.current = updatedArray[i].current;
          user.data[i].location.hourly = updatedArray[i].hourly;
          user.data[i].location.daily = updatedArray[i].daily;
        }
      }
      const saveUpdatedLocation = await user.save();
      response.json(user.data);
    } else {
      // Handle the case when updatedArray is empty.
      response.status(400).json({ message: "No data to update." });
    }
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
    const locationIndex = user.data.findIndex(
      (n) => n._id.toString() === locationId
    );
    user.data.splice(locationIndex, 1);
    // user.data = user.data.filter((n) => !n._id.toString() !== locationId);
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
  updateAllUserLocations,
};
