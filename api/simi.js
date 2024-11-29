const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/simi', async (req, res) => {
  const { text } = req.query; // Mengambil parameter query "text"

  if (!text) {
    return res.status(400).json({
      status: false,
      creator: "Hello Line", 
      error: "Mau Tanya Apa?"
    });
  }

  try {
    const response = await axios.get(`https://api.vreden.my.id/api/simi`, {
      params: { query: text, lang: 'id' } // Menggunakan text sebagai query
    });

    return res.status(200).json({
      status: true,
      creator: "Hello Line", 
      result: response.data.result, // Mengembalikan hasil dari API
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