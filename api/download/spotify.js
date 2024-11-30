const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/download/spotify', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'url' is required."
      });
    }

    const response = await axios.get(`https://api.siputzx.my.id/api/d/spotify?url=${encodeURIComponent(url)}`);

    const metadata = response.data.metadata;
    const downloadUrl = response.data.download;

    return res.status(200).json({
      status: true,
      creator: "Hello Line",
      metadata: {
        album_artist: metadata.album_artist,
        album_name: metadata.album_name,
        artist: metadata.artist,
        cover_url: metadata.cover_url,
        name: metadata.name,
        release_date: metadata.releaseDate,
        track_number: metadata.trackNumber,
        spotify_url: metadata.url
      },
      download: downloadUrl
    });
  } catch (e) {
    console.error("Error:", e.message);
    return res.status(500).json({
      status: false,
      creator: "Hello Line", 
      error: "Internal server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});