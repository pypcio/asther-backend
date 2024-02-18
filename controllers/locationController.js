const locationController = require("./APIsController.js");
const { asyncHandler } = require("../middleware/asyncHandler.js");
const {
  findUserById,
  updateLocationData,
} = require("../servises/userServise.js");

const getUserLocations = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req.user;
  const user = await findUserById(id);
  res.json(user.data);
});

const getUserLocation = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req.user;
  const user = await findUserById(id);
  const location = user.data.find(
    (loc) => loc._id.toString() === req.params.locationId
  );
  res.json(location || { message: "Location not found" });
});

const createUserLocation = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req.user;
  const user = await findUserById(id);
  const newLocation = { location: { createdAt: Date.now() } };
  user.data.push(newLocation);
  const savedUser = await user.save();
  res.json(savedUser.data[savedUser.data.length - 1]);
});

const updateUserLocation = asyncHandler(async (req, res) => {
  const user = await updateLocationData(
    req.user.id,
    req.params.locationId,
    req.body
  );
  res.status(200).json({ message: "Location updated successfully." });
});

const updateAllUserLocations = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req.user;
  const user = await findUserById(id);
  const updatedData = await Promise.all(
    user.data.map(async (loc) => {
      if (loc.location.city) {
        return await locationController.fetchWeatherData(
          loc.location.lat,
          loc.location.lon
        );
      }
      return loc;
    })
  );

  user.data.forEach((loc, index) => {
    if (loc.location.city) {
      Object.assign(loc.location, updatedData[index]);
    }
  });

  await user.save();
  res.status(200).json({ message: "Locations updated successfully." });
});

const deleteUserLocation = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req.user;
  const user = await findUserById(id);
  const locationIndex = user.data.findIndex(
    (loc) => loc._id.toString() === req.params.locationId
  );
  if (locationIndex !== -1) {
    user.data.splice(locationIndex, 1);
    await user.save();
  }
  res.status(204).end();
});

module.exports = {
  getUserLocations,
  getUserLocation,
  deleteUserLocation,
  createUserLocation,
  updateUserLocation,
  updateAllUserLocations,
};
