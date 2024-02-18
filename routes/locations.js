//CRUD API for user data
//secured routes with jwt
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const locatonController = require("../controllers/locationController");
const apiData = require("../controllers/APIsController");
const authenticate = require("../middleware/authenticate");
router.use(authenticate);
// router.get("/", userController.getUser);
// router.delete("/", userController.deleteUser);
router.get("/", locatonController.getUserLocations);
router.get("/:locationId", locatonController.getUserLocation);
router.post("/", locatonController.createUserLocation);
router.put("/:locationId", locatonController.updateUserLocation);
router.patch("/password", userController.updateUserPassword);
router.put("/", locatonController.updateAllUserLocations);
router.delete("/:locationId", locatonController.deleteUserLocation);
router.delete("/", userController.deleteUser);
//apis
router.post("/weather", apiData.getWeather);
router.post("/geolocation", apiData.geocodingGoogleApi);
module.exports = router;
