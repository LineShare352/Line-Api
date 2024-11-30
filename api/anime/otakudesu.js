const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/anime/otakudesu/search', async (req, res) => {
  const { s } = req.query;  

  if (!s) {
    return res.status(400).json({
      status: false,
      creator: "Hello Line",  
      error: "Query parameter 's' is required.",      
    });
  }

  try {
    const apiUrl = `https://api.siputzx.my.id/api/anime/otakudesu/search?s=${encodeURIComponent(s)}`;
    
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return res.status(404).json({
        status: false,
        creator: "Hello Line",  
        error: `No anime found for query '${s}'.`,
      });
    }

    return res.status(200).json({
      status: true,
      creator: "Hello Line",  
      data: response.data.data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: false,
      creator: "Hello Line",  
      error: "Failed to retrieve anime data.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});