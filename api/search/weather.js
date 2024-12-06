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
    const response = await axios.get(`https://wttr.in/${city}?format=%C+%t`);
    return {
      success: true,
      author: "@Selxyz",
      result: response.data,
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return { success: false, error: "Failed to fetch weather info." };
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
