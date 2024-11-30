const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/download/capcut', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'url' is required."
      });
    }

    const response = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(url)}`);

    const data = response.data.data;

    return res.status(200).json({
      status: true,
      creator: "Hello Line", 
      data: data.map(item => ({
        code: item.code, 
        title: item.title, 
        description: item.description, 
        usage: item.usage,
        originalVideoUrl: item.originalVideoUrl, 
        coverUrl: item.coverUrl, 
        authorUrl: item.authorUrl
      }))
    });
  } catch (e) {
    console.error("Error:", e.message);
    return res.status(500).json({
      status: false,
      creator: "Hello Line",
      error: "Internal server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});