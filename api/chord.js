const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/chord', async (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      creator: "Hello Line", 
      error: "Masukkan judul lagu untuk mencari chord."
    });
  }

  try {
    const response = await axios.get(`https://btch.us.kg/chord`, {
      params: { query: text } 
    });

    return res.status(200).json({
      status: true,
      creator: "Hello Line", 
      chord: response.data.chord || "Chord tidak ditemukan.",
    });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).json({
      status: false,
      creator: "Hello Line", 
      error: "Internal server error.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});