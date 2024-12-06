const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const randomQuote = async () => {
  try {
    const response = await axios.get("http://quotes.toscrape.com/");
    const $ = cheerio.load(response.data);
    const quotes = [];

    $(".quote").each((index, element) => {
      const text = $(element).find(".text").text().trim();
      const author = $(element).find(".author").text().trim();
      quotes.push({ text, author });
    });

    const randomIndex = Math.floor(Math.random() * quotes.length);
    return {
      success: true,
      creator: "Hello Line",
      result: quotes[randomIndex],
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching quote data:", error.message);
    return { success: false, error: "Failed to fetch quote." };
  }
};

app.get('/api/random/quotes', async (req, res) => {
  const quoteData = await randomQuote();
  return res.status(quoteData.success ? 200 : 500).json(quoteData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});