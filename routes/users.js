//User registration and login
const express = require("express");
const router = express.Router();
const AuthCotroller = require("../controllers/AuthController");
const authenticate = require("../middleware/authenticate");
// const UserController = require("../controllers/UserControll");

router.post("/register", AuthCotroller.register);
router.post("/login", AuthCotroller.login);
router.post("/refresh-token", authenticate, AuthCotroller.refreshToken);
module.exports = router;
