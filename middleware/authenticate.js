const jwt = require("jsonwebtoken");
const authenticate = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SIGNIN_TOKEN);
    // console.log("auth decode: ", decode);
    request.user = decode;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.status(403).json({
        message: "Token Expired!",
      });
    } else {
      response.status(401).json({
        message: "Authentication Failed!",
      });
    }
  }
};

module.exports = authenticate;
