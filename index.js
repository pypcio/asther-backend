const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
//middleware
const ErrorControll = require("./controllers/ErrorControll");
//routes
const authRoute = require("./routes/users.js");
const locationRoute = require("./routes/locations.js");
//app
const app = express();
// app.use(express.static("dist"));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(cors());
app.use(
  // morgan(":method :url :status :res[content-length] - :response-time ms :data")
  morgan("dev")
);
//routes
app.use("/api/user", authRoute);
app.use("/api/data", locationRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
// Catch-all handler for unknown routes
app.use(ErrorControll.unknownEndpoint);
app.use(ErrorControll.errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/data`);
});
