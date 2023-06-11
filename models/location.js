const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("connecting to server ");

mongoose
  .connect(url)
  .then((result) => {
    console.log("conneced to MongoDB");
  })
  .catch((error) => {
    console.log("connection error: ", error.message);
  });

//schema -base data cell
const locationSchema = new mongoose.Schema({
  createdAt: String,
  city: String,
  lat: Number,
  lon: Number,
  timezone: String,
  timezone_offset: Number,
  current: {
    dt: Number,
    sunrise: Number,
    sunset: Number,
    temp: Number,
    feels_like: Number,
    pressure: Number,
    humidity: Number,
    dew_point: Number,
    uvi: Number,
    clouds: Number,
    visibility: Number,
    wind_speed: Number,
    wind_deg: Number,
    wind_gust: Number,
    weather: [
      {
        description: String,
        icon: String,
        id: Number,
        main: String,
      },
    ],
  },
  hourly: [
    {
      clouds: Number,
      dew_point: Number,
      dt: Number,
      feels_like: Number,
      humidity: Number,
      pop: Number,
      pressure: Number,
      temp: Number,
      uvi: Number,
      visibility: Number,
      weather: [
        {
          description: String,
          icon: String,
          id: Number,
          main: String,
        },
      ],
      wind_deg: Number,
      wind_gust: Number,
      wind_speed: Number,
    },
  ],
  daily: {
    clouds: Number,
    dew_point: Number,
    dt: Number,
    feels_like: {
      day: Number,
      eve: Number,
      morn: Number,
      night: Number,
    },
    humidity: Number,
    moon_phase: Number,
    moonrise: Number,
    moonset: Number,
    pop: Number,
    pressure: Number,
    sunrise: Number,
    sunset: Number,
    temp: {
      day: Number,
      eve: Number,
      max: Number,
      min: Number,
      morn: Number,
      night: Number,
    },
    uvi: Number,
    weather: [
      {
        description: String,
        icon: String,
        id: Number,
        main: String,
      },
    ],
    wind_deg: Number,
    wind_gust: Number,
    wind_speed: Number,
  },
});
//added scheme option method // configuration
locationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Location", locationSchema);
