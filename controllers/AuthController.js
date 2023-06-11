const User = require("../models/user.js");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (request, response, next) => {
  const body = request.body;
  bcypt.hash(body.password, 10, function (err, hashedPass) {
    if (err) {
      response.json({ error: err });
    }
    let user = new User({
      login: body.login,
      password: hashedPass,
      email: body.email || "",
    });
    //save user
    user
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => next(err));
  });
};

module.exports = { register };
