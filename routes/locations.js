//CRUD API for user data
//secured routes with jwt
const express = require("express");
const router = express.Router();
const userController = require("../controllers/locationControll");
const authenticate = require("../middleware/authenticate");

router.use(authenticate);
// router.get("/", userController.getUser);
// router.delete("/", userController.deleteUser);
router.get("/", userController.getUserLocations);
router.get("/:locationId", userController.getUserLocation);
router.post("/", userController.createUserLocation);
router.put("/:locationId", userController.updateUserLocation);
router.patch("/password", userController.updateUserPassword);
router.put("/", userController.updateAllUserLocations);
router.delete("/:locationId", userController.deleteUserLocation);
router.delete("/", userController.deleteUser);
module.exports = router;
