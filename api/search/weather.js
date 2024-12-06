const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const weatherInfo = async (city) => {
  try {
    const response = await axios.get(`https://weather.com/weather/today/l/${encodeURIComponent(city)}`);
    const $ = cheerio.load(response.data);

    const location = $(".CurrentConditions--location--1Ayv3").text();
    const temperature = $(".CurrentConditions--tempValue--3KcTQ").text();
    const condition = $(".CurrentConditions--phraseValue--2xXSr").text();

    return {
      success: true,
      author: "Hello Line",
      result: {
        location,
        temperature,
        condition,
      },
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return { success: false, error: "Failed to fetch weather information." };
  }
};

app.get('/api/search/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      success: false,
      creator: "Hello Line",
      error: "Parameter 'city' is required.",
    });
  }

  const weatherData = await weatherInfo(city);
  return res.status(weatherData.success ? 200 : 500).json(weatherData);
});