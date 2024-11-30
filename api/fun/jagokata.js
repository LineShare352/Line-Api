const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/fun/jagokata', async (req, res) => {
  try {
    const { text } = req.query; 

    if (!text) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'text' is required."
      });
    }

    const response = await axios.get(`https://api.siputzx.my.id/api/fun/jagokata?q=${encodeURIComponent(text)}`);
    
    const data = response.data.data.map(item => ({
      quote: item.quote || "Quote not available",
      link: item.link || "",
      author: item.author || "Unknown",
      description: item.description || "",
      lifespan: item.lifespan || "",
      votes: item.votes || "0",
      category: item.category || "Unknown category"
    }));

    return res.status(200).json({
      status: true,
      creator: "Hello Line", 
      data: data 
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
