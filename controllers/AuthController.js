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
      createdAt: Date.now(),
    });
    //save user
    user
      .save()
      .then((result) => {
        response.json(result);
      })
      .catch((err) => next(err));
  });
};
const login = (request, response, next) => {
  const body = request.body;
  const username = body.login;
  const password = body.password;
  const signInTokenSecret = process.env.SIGNIN_TOKEN;
  const refreshTokenSecret = process.env.SIGNIN_TOKEN;
  User.findOne({ $or: [{ email: username }, { login: username }] }).then(
    (user) => {
      if (user) {
        bcypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign(
              {
                user: { name: username, email: user.email || "", id: user.id },
              },
              signInTokenSecret,
              {
                expiresIn: "30min",
              }
            );
            let refreshToken = jwt.sign(
              {
                user: { name: username, email: user.email || "", id: user.id },
              },
              refreshTokenSecret,
              { expiresIn: "48h" }
            );
            response.status(200).json({
              message: "login sucessful!",
              token,
              refreshToken,
              user: { name: username, email: user.email || "", id: user.id },
            });
          } else {
            response.json({
              message: "Password incorect",
            });
          }
        });
      } else {
        response.json({ message: "User not found!" });
      }
    }
  );
};
const refreshToken = (request, response, next) => {
  const refreshToken = request.body.refreshToken;
  console.log("request", request.body.refreshToken); // ???????????
  // console.log("body", request.body);
  const refreshTokenSecret = process.env.SIGNIN_TOKEN;
  // console.log("swiezy token: ", refreshToken);
  jwt.verify(refreshToken, refreshTokenSecret, function (err, decode) {
    // console.log("what is it: ", decode);
    if (err) {
      response.status(400).json({
        message: "Error",
      });
    } else {
      let token = jwt.sign(
        {
          user: { name: decode.name, email: decode.email || "", id: decode.id },
        },
        refreshTokenSecret,
        {
          expiresIn: "30min",
        }
      );
      let refreshToken = request.body.refreshToken;
      response.status(200).json({
        message: "Token refreshed succesfully",
        token,
        refreshToken,
      });
    }
  });
};
module.exports = { register, login, refreshToken };
