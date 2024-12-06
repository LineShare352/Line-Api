const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const randomJoke = async () => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    return {
      success: true,
      creator: "Hello Line",
      result: response.data,
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    return { success: false, error: "Failed to fetch joke." };
  }
};

app.get('/api/random/jokes', async (req, res) => {
  const jokeData = await randomJoke();
  return res.status(jokeData.success ? 200 : 500).json(jokeData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});