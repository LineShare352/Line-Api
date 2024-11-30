const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.use(cors());

app.get('/api/random/vietnam', async (req, res) => {
  try {
    const response = await axios.get('https://api.siputzx.my.id/api/r/cecan/vietnam?-', {
      responseType: 'stream', 
    });

    res.setHeader('Content-Type', response.headers['content-type']);

    response.data.pipe(res);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch image from the source.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});