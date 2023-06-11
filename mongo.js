const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
const User = require("./models/user.js");
const weather = require("./weather.js");

//connection
// console.log("connectiong to server with url: ", url);
// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("conneced to MongoDB");
//   })
//   .catch((error) => {
//     console.log("connection error: ", error.message);
//   });
// //create schema
// const locationSchema = new mongoose.Schema({
//   createdAt: String,
//   lat: Number,
//   lon: Number,
//   timezone: String,
//   timezone_offset: Number,
//   current: {
//     dt: Number,
//     sunrise: Number,
//     sunset: Number,
//     temp: Number,
//     feels_like: Number,
//     pressure: Number,
//     humidity: Number,
//     dew_point: Number,
//     uvi: Number,
//     clouds: Number,
//     visibility: Number,
//     wind_speed: Number,
//     wind_deg: Number,
//     wind_gust: Number,
//     weather: [
//       {
//         description: String,
//         icon: String,
//         id: Number,
//         main: String,
//       },
//     ],
//   },
//   hourly: [
//     {
//       clouds: Number,
//       dew_point: Number,
//       dt: Number,
//       feels_like: Number,
//       humidity: Number,
//       pop: Number,
//       pressure: Number,
//       temp: Number,
//       uvi: Number,
//       visibility: Number,
//       weather: [
//         {
//           description: String,
//           icon: String,
//           id: Number,
//           main: String,
//         },
//       ],
//       wind_deg: Number,
//       wind_gust: Number,
//       wind_speed: Number,
//     },
//   ],
//   daily: Array,
// });
// //id to string
// locationSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
// //create model;
// const Location = mongoose.model("Location", locationSchema);
//create colection eleemnt

//create new object
// const newLocation = new Location({
//   createdAt: Date.now(),
// });
// newLocation.save().then((result) => {
//   // console.log(`Added new location at ${result.createdAt}`)
//   console.log("saved!");
//   mongoose.connection.close();
// });
//update here !!!!!

//create new object

const test1 = {
  login: "Aron",
  password: "72hfa",
};
const newUser = new User(test1);
newUser.save().then((createdUser) => {
  console.log(createdUser);
  mongoose.connection.close();
});
// const id = "6479fd8c34fbf02a8db3d195";
// const locationTest = { ...weather };
// Location.findByIdAndUpdate(id, locationTest, { new: true }).then(
//   (updatedPerson) => {
//     console.log(updatedPerson);
//     response.json(updatedPerson);
//     console.log("updated!");
//     mongoose.connection.close();
//   }
// );
// module.exports = mongoose.model("Location", locationSchema);
