const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function detikFood(makanan) {
  try {
    const ress = await axios.get(`https://www.detik.com/search/searchall?query=${makanan}&siteid=35`);
    const $ = cheerio.load(ress.data);
 
    const articles = [];
 
    $(".list-content__item").each((i, el) => {
      const title = $(el).find(".media__title a").text().trim();
      const link = $(el).find(".media__title a").attr("href");
      const image = $(el).find(".media__image img").attr("src");
      const description = $(el).find(".media__desc").text().trim();
      const date = $(el).find(".media__date span").attr("title");
 
      articles.push({
        title,
        link,
        image,
        description,
        date,
      });
    });
 
    return {
      success: true,
      author: "Hello Line",
      results: articles,
      request_at: new Date()
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      error: "Failed to fetch data",
      results: []
    };
  }
}

app.get('/api/search/food', async (req, res) => {
  try {
    const { makanan } = req.query;

    if (!makanan) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'makanan' is required.",
      });
    }

    const results = await detikFood(makanan);

    if (!results.success || !results.results || results.results.length === 0) {
      return res.status(404).json({
        status: false,
        creator: "Hello Line",
        error: "No food articles found.",
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: false,
      creator: "Hello Line",
      error: "Internal server error.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});