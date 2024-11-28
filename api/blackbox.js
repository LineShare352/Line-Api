const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get("/api/blackbox.js", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: "Mau Tanya Apa?" });

  try {
    // Membuat data permintaan untuk API eksternal
    const requestData = {
      content: text,
      cName: "LineAja",
      cID: "LineAja1iMSwjx",
    };

    // Mengirim permintaan ke Blackbox AI
    const response = await axios.post('https://luminai.my.id/', requestData);
    const sai = response.data; // Respons utama dari API eksternal
    const pe = sai.result; // Ekstrak hasil dari respons

    // Mengembalikan hasil dalam format JSON
    return res.status(200).json({
      status: true,
      result: pe,
    });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});