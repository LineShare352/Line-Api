const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch'); // Menggunakan node-fetch sebagai pengganti axios
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/chord', async (req, res) => {
  const { text } = req.query; // Mengambil parameter query "text"

  if (!text) {
    return res.status(400).json({
      status: false,
      creator: "Hello Line", 
      error: "Masukkan judul lagu untuk mencari chord."
    });
  }

  try {
    const apiUrl = `https://btch.us.kg/chord?query=${encodeURIComponent(text)}`; // URL API
    const response = await fetch(apiUrl); // Mengganti axios dengan fetch
    const data = await response.json(); // Parsing response ke JSON

    if (response.ok && data && data.chord) {
      return res.status(200).json({
        status: true,
        creator: "Hello Line", 
        result: {
          chord: data.chord // Menyimpan data chord di result
        }
      });
    }

    return res.status(404).json({
      status: false,
      creator: "Hello Line", 
      error: "Chord tidak ditemukan."
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
