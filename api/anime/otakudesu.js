const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/search/otakudesu', async (req, res) => {
  const { s } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      error: "Query parameter ''s is required.",
    });
  }

  try {
    const { data: html } = await axios.get(s);

    const $ = cheerio.load(html);

    const title = $('.venutama .venser .post h1').text() || null;
    const imageUrl = $('.venutama .venser .post img').attr('src') || null;
    const genres = $('.info > p:nth-child(6)')
      .find('a')
      .map((_, el) => $(el).text())
      .get()
      .join(', ') || null;
    const status = $('.info > p:nth-child(4)').text().split(':')[1]?.trim() || null;
    const rating = $('.info > p:nth-child(5)').text().split(':')[1]?.trim() || null;

    if (!title) {
      return res.status(404).json({
        status: false,
        error: "Anime data not found.",
      });
    }

    return res.status(200).json({
      status: true,
      data: [
        {
          title,
          link: url,
          imageUrl,
          genres,
          status,
          rating,
        },
      ],
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: false,
      error: "Failed to retrieve anime data.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});