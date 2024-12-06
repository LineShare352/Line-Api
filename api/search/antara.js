const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const antara = async (news) => {
  try {
    const response = await axios.get(`https://m.antaranews.com/search?q=${encodeURIComponent(news)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Referer': 'https://apk.support/',
        'Origin': 'https://apk.support',
        'Cache-Control': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'Pragma': 'no-cache',
        'DNT': '1',
        'TE': 'trailers',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const articles = [];

    $('.card__post').each((index, element) => {
      const title = $(element).find('.card__post__title a').text().trim();
      const link = $(element).find('.card__post__title a').attr('href');
      const time = $(element).find('.card__post__author-info span').text().trim();
      const description = $(element).find('.card__post__content p').text().trim();
      const image = $(element).find('picture img').attr('data-src');

      articles.push({
        title,
        link,
        time,
        description,
        image,
      });
    });

    return {
      success: true,
      author: "Hello Line",
      result: articles,
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

app.get('/api/search/antara', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      creator: "Hello Line",
      error: "Parameter 'query' is required.",
    });
  }

  const newsData = await antara(query);
  return res.status(newsData.success ? 200 : 500).json(newsData);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});