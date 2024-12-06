const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const imdbSearch = async (title) => {
  try {
    const response = await axios.get(`https://www.imdb.com/find?q=${encodeURIComponent(title)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const results = [];

    $('.findResult').each((index, element) => {
      const movieTitle = $(element).find('.result_text a').text().trim();
      const link = 'https://www.imdb.com' + $(element).find('.result_text a').attr('href');
      const year = $(element).find('.result_text').text().match(/(\d{4})/)?.[1] || 'Unknown';
      const poster = $(element).find('td a img').attr('src') || 'No image available';

      results.push({ title: movieTitle, link, year, poster });
    });

    return {
      success: true,
      author: "Hello Line",
      result: results,
      request_at: new Date(),
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      success: false,
      error: "Failed to fetch data.",
    };
  }
};

app.get('/api/search/imdb', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      creator: "Hello Line",
      error: "Parameter 'query' is required.",
    });
  }

  const movieData = await imdbSearch(query);
  return res.status(movieData.success ? 200 : 500).json(movieData);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});