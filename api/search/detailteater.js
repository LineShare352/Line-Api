const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function detailTeater(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const movieDetails = {
      title: $('img.movieposter-thumb').attr('alt'),
      poster: $('img.movieposter-thumb').attr('src'),
      imdbRating: $('th:contains("IMDB")').next().text().trim(),
      director: $('th:contains("Sutradara")').next().text().trim(),
      writer: $('th:contains("Penulis")').next().text().trim(),
      production: $('th:contains("Produksi")').next().text().trim(),
      trailer: $('iframe[src*="teater"]').attr('src') || $('video source').attr('src'),
    };

    return {
      success: true,
      creator: "Hello Line",
      data: movieDetails,
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    return {
      success: false,
      message: "Failed to fetch movie data",
    };
  }
}

app.get('/api/search/detailteater', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'url' is required.",
      });
    }

    const results = await detailTeater(url);

    if (!results.success || !results.data.title) {
      return res.status(404).json({
        status: false,
        creator: "Hello Line",
        error: "No movie details found.",
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