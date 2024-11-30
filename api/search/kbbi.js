const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/search/kbbi', async (req, res) => {
  try {
    const { text } = req.query; 

    if (!text) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'text' is required."
      });
    }

    const response = await axios.get(`https://api.siputzx.my.id/api/s/kbbi?q=${encodeURIComponent(text)}`);

    return res.status(200).json({
      status: true,
      creator: "Hello Line",
      data: response.data.data 
      
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
