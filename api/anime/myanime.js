const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const animeSearch = async (query) => {
  try {
    const response = await axios.get(`https://myanimelist.net/search/all?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(response.data);
    const results = [];

    $(".list.di-t.w100").each((index, element) => {
      const title = $(element).find(".hoverinfo_trigger").text().trim();
      const link = $(element).find(".hoverinfo_trigger").attr("href");
      const image = $(element).find("img").attr("data-src");

      if (title && link) {
        results.push({ title, link, image });
      }
    });

    return {
      success: true,
      author: "Hello Line",
      result: results,
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching anime data:", error.message);
    return { success: false, error: "Failed to fetch anime data." };
  }
};

app.get('/api/anime/myanime', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Parameter 'query' is required.",
    });
  }

  const animeData = await animeSearch(query);
  return res.status(animeData.success ? 200 : 500).json(animeData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});