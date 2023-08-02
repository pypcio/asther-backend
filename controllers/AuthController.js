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
  // console.log("pokaz dane", username, password);
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
                expiresIn: "15min",
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
  const refreshToken = request.headers.authorization.split(" ")[1];
  const refreshTokenSecret = process.env.SIGNIN_TOKEN;
  // console.log("swiezy token: ", refreshToken);
  jwt.verify(refreshToken, refreshTokenSecret, function (err, decode) {
    // console.log("refresh Data: ", decode);
    if (err) {
      response.status(400).json({
        message: "Error",
      });
    } else {
      let token = jwt.sign(
        {
          user: {
            name: decode.user.name,
            email: decode.user.email || "",
            id: decode.user.id,
          },
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
        user: {
          name: decode.user.name,
          email: decode.user.email || "",
          id: decode.user.id,
        },
      });
    }
  });
};
module.exports = { register, login, refreshToken };
