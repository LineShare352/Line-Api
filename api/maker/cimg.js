const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function cimg(prompt) {
  try {
    const response = await axios.get(`https://imgen.duck.mom/prompt/${encodeURIComponent(prompt)}`, {
      timeout: 20000, 
    });
    
    const imageUrl = response.request.res.responseUrl;  
    
    if (imageUrl) {
      return imageUrl;
    } else {
      throw new Error('Failed to retrieve a valid image URL.');
    }
  } catch (error) {
    console.error("Error fetching image from CIMG:", error.message);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again later.');
    }
    
    return null;
  }
}

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
    const imageUrl = await cimg(prompt);
    
    if (imageUrl) {
      return res.redirect(imageUrl);
    } else {
      return res.status(500).json({
        success: false,
        creator: "Hello Line",
        error: "Failed to fetch image from CIMG.",
      });
    }
  } catch (error) {
    console.error("Error in /api/maker/cimg:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
