const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/tools/base64', (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      creator: 'Hello Line', 
      message: 'Missing text query parameter.',
    });
  }

  try {
    const base64Encoded = Buffer.from(text).toString('base64');
    res.json({
      status: true,
      creator: 'Hello Line', 
      original: text,
      base64: base64Encoded,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: false,
      creator: 'Hello Line', 
      message: 'Failed to encode text to Base64.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
