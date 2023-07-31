const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI_USER;
console.log("connecting to server...");

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to users data");
  })
  .catch((error) => {
    console.log("connection error: ", error.message);
  });
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
const userSchema = mongoose.Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Number,
    require: true,
  },
  data: [
    {
      location: {
        createdAt: Number,
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
        daily: [
          {
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
        ],
      },
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("User", userSchema);
