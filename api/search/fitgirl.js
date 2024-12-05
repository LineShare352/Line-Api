const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const FitGirl = async (page) => {
  try {
    const url = `https://fitgirl-repacks.site/all-my-repacks-a-z/?lcp_page0=${page}#lcp_instance_0`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const games = [];

    $(".lcp_catlist li a").each((_, element) => {
      const title = $(element).text().trim();
      const link = $(element).attr("href");
      games.push({ title, link });
    });

    return {
      success: true,
      creator: "Hello Line",
      page,
      games,
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching FitGirl data:", error.message);
    return {
      success: false,
      error: "Failed to fetch data from FitGirl site.",
      request_at: new Date(),
    };
  }
};

app.get('/api/search/fitgirl', async (req, res) => {
  const { page } = req.query;
  const pageNumber = parseInt(page, 10) || 1;

  const result = await FitGirl(pageNumber);
  return res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});