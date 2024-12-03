const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function appsApple(query) {
  try {
    const url = `https://www.apple.com/us/search/${encodeURIComponent(query)}?src=globalnav`;
 
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'TE': 'trailers',
      },
      timeout: 10000,
    });
 
    const $ = cheerio.load(response.data);
 
    const results = [];
    $('.rf-serp-curated-product').each((i, element) => {
      const title = $(element).find('.rf-serp-productname').text().trim();
      const description = $(element).find('.rf-serp-productdescription').text().trim();
      const image = $(element).find('img').attr('src');
      const link = $(element).find('.rf-serp-productoption-link a').attr('href');
 
      results.push({ title, description, image, link });
    });
 
    return {
      success: true,
      author: "Hello Line",
      result: results,
      request_at: new Date(),
    };
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    return {
      success: false,
      error: 'Failed to fetch data from Apple.',
      result: [],
    };
  }
}

app.get('/api/search/apple', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'query' is required.",
      });
    }

    const results = await appsApple(query);

    if (!results.success || results.result.length === 0) {
      return res.status(404).json({
        status: false,
        creator: "Hello Line",
        error: "No results found for the given query.",
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