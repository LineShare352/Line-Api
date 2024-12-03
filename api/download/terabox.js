const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

async function terabox(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post('https://teradl-api.dapuntaratya.com/generate_file', {
        mode: 1,
        url: url,
      });

      const array = [];
      for (let file of response.data.list) {
        try {
          const downloadResponse = await axios.post('https://teradl-api.dapuntaratya.com/generate_link', {
            js_token: response.data.js_token,
            cookie: response.data.cookie,
            sign: response.data.sign,
            timestamp: response.data.timestamp,
            shareid: response.data.shareid,
            uk: response.data.uk,
            fs_id: file.fs_id,
          });

          if (downloadResponse.data.download_link) {
            array.push({
              fileName: file.name,
              type: file.type,
              thumb: file.image,
              url: downloadResponse.data.download_link.url_1,
            });
          }
        } catch (error) {
          console.error(`Failed to generate download link for ${file.name}:`, error.message);
        }
      }

      resolve(array);
    } catch (error) {
      console.error('Error fetching data from Terabox API:', error.message);
      reject(error.response?.data || { error: 'Unknown error occurred' });
    }
  });
}

app.get('/api/download/terabox', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        creator: "Hello Line",
        error: "Query parameter 'url' is required.",
      });
    }

    const results = await terabox(url);

    if (!results || results.length === 0) {
      return res.status(404).json({
        status: false,
        creator: "Hello Line",
        error: "No files found or unable to generate download links.",
      });
    }

    return res.status(200).json({
      success: true,
      creator: "Hello Line",
      results: results,
      request_at: new Date(),
    });
  } catch (error) {
    console.error("Error:", error.message);
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