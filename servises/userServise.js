const User = require("../models/user");

const findUserById = async (id) => {
  return User.findById(id);
};

const updateLocationData = async (user, locationId, locationData) => {
  const locationIndex = user.data.findIndex(
    (n) => n._id.toString() === locationId
  );

  if (locationIndex === -1) {
    return null;
  }

  Object.assign(user.data[locationIndex].location, locationData);
  return user.save();
};

module.exports = {
  findUserById,
  updateLocationData,
};
