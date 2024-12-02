const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/tools/cekip', async (req, res) => {
  try {
    const ip = req.query.ip || ""; 

    const url = ip
      ? `http://ip-api.com/json/${encodeURIComponent(ip)}`
      : `http://ip-api.com/json/`; 

    const response = await axios.get(url);

    if (response.data.status === "fail") {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: response.data.message || "Invalid IP address.",
      });
    }

    return res.status(200).json({
      status: true,
      creator: "Hello Line",
      data: response.data,
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