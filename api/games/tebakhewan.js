const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/games/tebakhewan', async (req, res) => {
  try {
    const response = await axios.get('https://api.siputzx.my.id/api/games/tebakhewan?-');

    return res.status(200).json({
      status: true,
      creator: "Hello Line",
      data: response.data.data.map((item) => ({
        title: item.title,
        url: item.url
      }))
    });
  } catch (e) {
    console.error("Error:", e.message);
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