const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const randomMeme = async () => {
  try {
    const response = await axios.get("https://meme-api.com/gimme");
    return {
      success: true,
      creator: "Hello Line",
      result: {
        title: response.data.title,
        image: response.data.url,
        subreddit: response.data.subreddit,
      },
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching meme:", error.message);
    return { success: false, error: "Failed to fetch meme." };
  }
};

// Endpoint API untuk meme acak
app.get('/api/random/meme', async (req, res) => {
  const memeData = await randomMeme();
  return res.status(memeData.success ? 200 : 500).json(memeData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});