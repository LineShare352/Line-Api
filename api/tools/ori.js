const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/tools/ori', async (req, res) => {
  const { url } = req.query;

  if (!url || !url.includes('github.com')) {
    return res.status(400).json({
      status: false,
      creator: 'Hello Line', 
      result: 'Invalid or missing GitHub URL.',
    });
  }

  try {
    const oriUrl = url.replace('raw.githubusercontent.com', 'github.com').replace('/blob/', '/');
    return res.json({
      status: true,
      creator: 'Hello Line',
      result: `${oriUrl}`,
    }); 
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: false,
      creator: 'Hello Line', 
      result: 'Failed to convert GitHub URL to original.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});