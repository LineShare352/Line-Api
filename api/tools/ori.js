const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

function toGhOri(rawUrl) {
  return rawUrl
    .replace('raw.githubusercontent.com', 'github.com')
    .replace('/master', '/blob/master')
    .replace('/main', '/blob/main');
}

app.get('/api/tools/ori', async (req, res) => {
  const { url } = req.query;

  if (!url || !url.includes('raw.githubusercontent.com')) {
    return res.status(400).json({
      status: false,
      creator: 'Hello Line',
      result: 'Invalid or missing GitHub Raw URL.',
    });
  }

  try {
    const originalUrl = toGhOri(url);
    return res.json({
      status: true,
      creator: 'Hello Line',
      result: originalUrl,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: false,
      creator: 'Hello Line',
      result: 'Failed to convert GitHub Raw URL to original.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});