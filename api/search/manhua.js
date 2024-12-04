const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function manhua(name) {
  try {
    const response = await axios.get(`https://manhuaplus.org/search?keyword=${encodeURIComponent(name)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Referer': 'https://apk.support/',
        'Origin': 'https://apk.support',
        'Cache-Control': 'no-cache',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    const manhwaList = [];
    $('div.grid div').each((index, element) => {
      const title = $(element).find('.text-center a').text().trim();
      const link = $(element).find('.text-center a').attr('href');
      const coverImage = $(element).find('.b-img img').data('src');
      const chapter = $(element).find('a').last().text().trim();

      if (title && link && coverImage && chapter) {
        manhwaList.push({
          title,
          link: `https://manhuaplus.org${link}`,
          coverImage: `https://manhuaplus.org${coverImage}`,
          chapter,
        });
      }
    });

    return {
      success: true,
      creator: 'Hello Line',
      result: manhwaList,
      request_at: new Date(),
    };
  } catch (error) {
    console.error('Error fetching manhua data:', error.message);
    return {
      success: false,
      error: error.message,
      request_at: new Date(),
    };
  }
}

app.get('/api/anime/manhua', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Parameter 'name' is required.",
    });
  }

  const result = await manhua(name);
  return res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});