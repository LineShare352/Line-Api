const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const randomDog = async () => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    return {
      success: true,
      creator: "Hello Line",
      result: response.data.message,
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching dog image:", error.message);
    return { success: false, error: "Failed to fetch dog image." };
  }
};

app.get('/api/random/dog', async (req, res) => {
  const dogData = await randomDog();
  return res.status(dogData.success ? 200 : 500).json(dogData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});