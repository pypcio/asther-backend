const User = require("../models/user.js");
const bcypt = require("bcrypt");
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
  const {
    user: { id },
  } = request.user;
  // console.log("paramId", id);
  try {
    const deleteUser = await User.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
//change password
const updateUserPassword = async (request, response, next) => {
  const {
    user: { id },
  } = request.user;
  const { password, password2 } = request.body;
  // console.log("passwords", request.body);
  try {
    const user = await User.findById(id);
    bcypt.compare(password, user.password, function (err, result) {
      if (err) {
        response.json({
          error: err,
        });
      }
      if (result) {
        bcypt.hash(password2, 10, async function (err, hashedPass) {
          if (err) {
            response.json({ error: err });
          }
          user.password = hashedPass; //save new password
          const saveUpdatedLocation = await user.save();
        });
        response.status(200).json({
          message: "password changed sucessfully!",
        });
      } else {
        response.json({
          message: "Password incorect",
        });
      }
    });
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
  const updatedArray = request.body; // Make sure to declare updatedArray using const or let
  try {
    const user = await User.findById(id);
    if (
      !updatedArray ||
      !Array.isArray(updatedArray) ||
      updatedArray.length !== user.data.length
    ) {
      // Handle error case where lengths don't match or updatedArray is not an array
      return response
        .status(400)
        .json({ message: "Data lengths do not match or invalid data." });
    }
    for (let i = 0; i < user.data.length; i++) {
      if (user.data[i].location.city !== undefined) {
        // console.log("test currrent: ", i === 0 ? updatedArray[i].current : "");
        user.data[i].location.current = updatedArray[i].current;
        user.data[i].location.hourly = updatedArray[i].hourly;
        user.data[i].location.daily = updatedArray[i].daily;
      }
    }
    const saveUpdatedLocation = await user.save();
    response.json(user.data);
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
  updateUserPassword,
};
