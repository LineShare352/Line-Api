const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function komiku(query) {
  try {
    const ress = await axios.get(`https://api.komiku.id/?post_type=manga&s=${encodeURIComponent(query)}`);
    const $ = cheerio.load(ress.data);
    const mangaList = [];

    $('.bge').each((index, element) => {
      const title = $(element).find('h3').text().trim();
      const description = $(element).find('.judul2').text().trim();
      const image = $(element).find('img').attr('src');
      const link = $(element).find('a').attr('href');

      mangaList.push({
        title,
        description,
        image,
        url: "https://komiku.id" + link,
      });
    });

    return mangaList;
  } catch (error) {
    console.error("Error fetching data in komiku function:", error.message);
    throw new Error("Failed to fetch data from Komiku API.");
  }
}

app.get('/api/anime/komiku', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'query' is required.",
      });
    }

    try {
      const results = await komiku(query);

      if (results.length === 0) {
        return res.status(404).json({
          status: false,
          creator: "Hello Line",
          error: "No results found.",
        });
      }

      return res.status(200).json({
        status: true,
        creator: "Hello Line",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        creator: "Hello Line",
        error: error.message || "Internal server error.",
      });
    }
  } catch (error) {
    console.error("Error in /api/anime/komiku route:", error.message);
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
