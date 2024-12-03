const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function hoax(category) {
  try {
    const ress = await axios.get(`https://infohoax.bondowosokab.go.id/pencarian?cari=${category}`);
    const $ = cheerio.load(ress.data);

    const hoaxData = [];

    $('article.post').each((index, element) => {
      const title = $(element).find('.post-content h2 a').text().trim();
      const url = $(element).find('.post-content h2 a').attr('href');
      const imageUrl = $(element).find('.post-image img').attr('src');
      const day = $(element).find('.post-date .day').text().trim();
      const month = $(element).find('.post-date .month').text().trim();
      const year = $(element).find('.post-meta').text().match(/\d{4}/); 

      const fullDate = `${day} ${month} ${year ? year[0] : 'Unknown'}`;

      hoaxData.push({
        title,
        url: `https://infohoax.bondowosokab.go.id${url}`,
        imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://infohoax.bondowosokab.go.id${imageUrl}`,
        date: fullDate,
      });
    });

    return {
      success: true,
      author: "Hello Line",
      data: hoaxData,
      request_at: new Date(),
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      success: false,
      message: 'Failed to fetch hoax data.',
    };
  }
}

app.get('/api/search/hoax', async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'category' is required.",
      });
    }

    const results = await hoax(category);

    if (!results.success || results.data.length === 0) {
      return res.status(404).json({
        status: false,
        creator: "Hello Line",
        error: "No hoax data found.",
      });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error:', error.message);
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