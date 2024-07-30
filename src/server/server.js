const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

// Variables for URLs and API KEY
const GEONAMES_BASE_URL = "http://api.geonames.org/searchJSON?";
const GEONAMES_USER = process.env.GEONAMES_USER;

const WEATHERBIT_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;

const PIXABAY_BASE_URL = "https://pixabay.com/api/?";
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

app.post("/addTrip", async (req, res) => {
  const { location, startDate, endDate } = req.body;

  try {
    // Fetch location data from Geonames API
    const geonamesResponse = await fetch(
      `${GEONAMES_BASE_URL}q=${location}&maxRows=1&username=${GEONAMES_USER}`
    );
    const geonamesData = await geonamesResponse.json();
    if (!geonamesData.geonames || geonamesData.geonames.length === 0) {
      throw new Error("Location not found");
    }
    const { lat, lng, countryName } = geonamesData.geonames[0];

    // Fetch weather data from Weatherbit API
    const weatherResponse = await fetch(
      `${WEATHERBIT_BASE_URL}lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
    );
    const weatherData = await weatherResponse.json();
    if (!weatherData.data || weatherData.data.length === 0) {
      throw new Error("Weather data not available");
    }
    const weather =
      weatherData.data.find(
        (day) => new Date(day.valid_date).toISOString().split("T")[0] === startDate
      ) || weatherData.data[0];

    // Fetch image from Pixabay API
    const pixabayResponse = await fetch(
      `${PIXABAY_BASE_URL}key=${PIXABAY_API_KEY}&q=${location}&image_type=photo`
    );
    const pixabayData = await pixabayResponse.json();
    const image =
      pixabayData.hits.length > 0
        ? pixabayData.hits[0].webformatURL
        : "https://via.placeholder.com/400";

    // Prepare trip data
    const trip = {
      location,
      countryName,
      startDate,
      endDate,
      weather: weather
        ? { description: weather.weather.description, temperature: weather.temp }
        : { description: "No forecast available", temperature: "N/A" },
      image,
    };

    res.json(trip);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
