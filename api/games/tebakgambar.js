const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/games/tebakgambar', async (req, res) => {
  try {
    const response = await axios.get('https://api.siputzx.my.id/api/games/tebakgambar?-');

    return res.status(200).json({
      status: true,
      creator: "Hello Line",
      data: {
        index: response.data.data.index,
        img: response.data.data.img,
        jawaban: response.data.data.jawaban, 
        deskripsi: response.data.data.deskripsi
      }
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