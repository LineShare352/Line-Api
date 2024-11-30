const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/tools/raw', async (req, res) => {
  const { url } = req.query;

  if (!url || !url.includes('github.com')) {
    return res.status(400).json({
      status: false,
      creator: 'Hello Line', 
      message: 'Invalid or missing GitHub URL.',
    });
  }

  try {
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    res.redirect(rawUrl);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: false,
      creator: 'Hello Line', 
      message: 'Failed to convert GitHub URL to raw.',      
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});