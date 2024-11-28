const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get("/api/lumin.js", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: "Mau Tanya Apa?" });

  try {
    // Fungsi untuk memproses permintaan ke API eksternal
    async function lumin(query) {
      try {
        const response = await axios.get(`https://luminai.my.id/`, {
          params: { text: query }, // Mengirim parameter text ke API
        });
        return response.data; // Mengembalikan data dari API eksternal
      } catch (error) {
        console.error("Error fetching data from LuminAI API:", error.message);
        return null;
      }
    }

    const data = await lumin(text); // Memanggil fungsi lumin
    if (!data) return res.status(404).json({ error: "No data found." });

    res.json({ status: true, creator: "Line", result: data });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
