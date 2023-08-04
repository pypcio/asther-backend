const axios = require("axios");

const fetchWeatherData = async (lat, lon) => {
  const units = "metric";
  const lang = "pl";
  const apiKey = process.env.OPEN_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${apiKey}`;

  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const getWeather = async (request, response, next) => {
  const { lat, lon } = request.body;

  if (lat && lon) {
    try {
      const weatherData = await fetchWeatherData(lat, lon);
      response.json(weatherData);
    } catch (error) {
      next(error);
    }
  } else {
    response.status(400).json({ message: "wrong or incomplete input" });
  }
};

const geocodingGoogleApi = async (request, response, next) => {
  const { location } = request.body;
  if (location) {
    const temp = location.replace(/[,\s]+/g, "+");
    const params = {
      address: temp,
      key: process.env.GOOGLE_MAPS_API_KEY,
    };

    try {
      const responseFromGoogle = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        { params }
      );

      if (
        responseFromGoogle.data &&
        responseFromGoogle.data.results &&
        responseFromGoogle.data.results[0] &&
        responseFromGoogle.data.results[0].geometry &&
        responseFromGoogle.data.results[0].geometry.location
      ) {
        const locationData =
          responseFromGoogle.data.results[0].geometry.location;
        response.json(locationData);
      } else {
        response
          .status(400)
          .json({ message: "Unexpected data structure from Google API." });
      }
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({ message: "An error occurred while fetching location data." });
    }
  } else {
    response.status(400).json({ message: "Location must be provided" });
  }
};
module.exports = {
  fetchWeatherData,
  getWeather,
  geocodingGoogleApi,
};
