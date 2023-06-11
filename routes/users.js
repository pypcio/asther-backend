const express = require("express");
const router = express.Router();
const AuthCotroller = require("../controllers/AuthController");

// router.get("/api/user", (requset, response, next) => {
//   console.log("Hello!");
//   response.send("Hello!");
// });
router.post("/api/register", AuthCotroller.register);
module.exports = router;
