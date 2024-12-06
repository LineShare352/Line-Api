const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const cryptoPrices = async () => {
  try {
    const response = await axios.get("https://coinmarketcap.com/");
    const $ = cheerio.load(response.data);
    const cryptos = [];

    $(".cmc-table-row").each((index, element) => {
      const name = $(element).find(".cmc-link .cmc-table__column-name--name").text().trim();
      const price = $(element).find(".cmc-table__cell--sort-by__price").text().trim();
      cryptos.push({ name, price });
    });

    return {
      success: true,
      author: "Hello Line",
      result: cryptos.slice(0, 10), 
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching crypto prices:", error.message);
    return { success: false, error: "Failed to fetch cryptocurrency prices." };
  }
};


app.get('/api/search/crypto', async (req, res) => {
  const cryptoData = await cryptoPrices();
  return res.status(cryptoData.success ? 200 : 500).json(cryptoData);
});