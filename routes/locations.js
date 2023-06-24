//CRUD API for user data
//secured routes with jwt
const express = require("express");
const router = express.Router();
const userController = require("../controllers/locationControll");
const authenticate = require("../middleware/authenticate");

router.use(authenticate);

router.get("/", userController.getUser);
router.delete("/", userController.deleteUser);
router.get("/locations", userController.getUserLocations);
router.get("/locations/:locationId", userController.getUserLocation);
router.post("/locations", userController.createUserLocation);
router.put("/locations/:locationId", userController.updateUserLocation);
router.delete("/locations/:locationId", userController.deleteUserLocation);
module.exports = router;
