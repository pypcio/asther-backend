const express = require("express");
const router = express.Router();
const servises = require("../controllers/locationControll");

router.get("/download", servises.getDownloads);
router.get("/", servises.getAllLocation);
router.get("/:id", servises.getOneLocation);
router.get("info", servises.getInfoLocation);
router.post("/", servises.createLocation);
router.delete("/:id", servises.deleteLocation);
router.put("/:id", servises.updateLocation);

module.exports = router;
