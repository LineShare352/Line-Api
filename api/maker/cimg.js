const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/maker/cimg', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      creator: "Hello Line",
      error: "Parameter 'prompt' is required.",
    });
  }

  try {
    const response = await axios.get(`https://imgen.duck.mom/prompt/${encodeURIComponent(prompt)}`, {
      responseType: 'arraybuffer',
    });
    
    res.set('Content-Type', response.headers['content-type']);
    return res.send(response.data);
  } catch (error) {
    console.error("Error fetching image from CIMG:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch image from CIMG.",
    });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
