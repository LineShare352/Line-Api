const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const cimg = async (prompt) => {
  try {
    const response = await axios.get(`https://imgen.duck.mom/prompt/${prompt}`);
    const imageUrl = response.request.res.responseUrl;  
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image from CIMG:", error.message);
    return null;
  }
};

app.get('/api/maker/cimg', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      creator: "Hello Line",
      error: "Parameter 'prompt' is required.",
    });
  }

  const imageUrl = await cimg(prompt);
  
  if (imageUrl) {
    return res.redirect(imageUrl);
  } else {
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