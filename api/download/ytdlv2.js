const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const YTDLv2 = {
  supportedQualities: {
    audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
    video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' },
  },

  requestHeaders: {
    accept: '*/*',
    referer: 'https://ytshorts.savetube.me/',
    origin: 'https://ytshorts.savetube.me/',
    'user-agent': 'Downloader/2.0',
    'content-type': 'application/json',
  },

  getRandomCDN() {
    return 50 + Math.floor(Math.random() * 12);
  },

  validateQuality(type, index) {
    if (!this.supportedQualities[type]?.[index]) {
      throw new Error(
        `Invalid quality for ${type}. Available options: ${Object.values(this.supportedQualities[type]).join(', ')}`
      );
    }
  },

  async sendPostRequest(url, cdn, payload = {}) {
    const headers = {
      ...this.requestHeaders,
      authority: `cdn${cdn}.savetube.su`,
    };

    try {
      const response = await axios.post(url, payload, { headers });
      return response.data;
    } catch (error) {
      console.error('Request failed:', error.message);
      throw new Error('Failed to fetch data from the server.');
    }
  },

  generateDownloadLink(cdnUrl, type, quality, videoKey) {
    return `https://${cdnUrl}/download`;
  },

  async downloadMedia(videoUrl, type, qualityIndex) {
    const quality = this.supportedQualities[type]?.[qualityIndex];
    if (!quality) throw new Error('Invalid quality index.');

    const cdnNumber = this.getRandomCDN();
    const cdnUrl = `cdn${cdnNumber}.savetube.su`;

    const videoDetails = await this.sendPostRequest(`https://${cdnUrl}/info`, cdnNumber, { url: videoUrl });

    const downloadPayload = {
      downloadType: type,
      quality,
      key: videoDetails.data.key,
    };

    const downloadResponse = await this.sendPostRequest(
      this.generateDownloadLink(cdnUrl, type, quality, videoDetails.data.key),
      cdnNumber,
      downloadPayload
    );

    return {
      link: downloadResponse.data.downloadUrl,
      duration: videoDetails.data.duration,
      durationLabel: videoDetails.data.durationLabel,
      fromCache: videoDetails.data.fromCache,
      id: videoDetails.data.id,
      key: videoDetails.data.key,
      thumbnail: videoDetails.data.thumbnail,
      thumbnail_formats: videoDetails.data.thumbnail_formats,
      title: videoDetails.data.title,
      titleSlug: videoDetails.data.titleSlug,
      videoUrl: videoDetails.data.url,
      quality,
      type,
    };
  },

  async downloadVideoAndAudio(videoUrl, videoQualityIndex, audioQualityIndex) {
    const videoData = await this.downloadMedia(videoUrl, 'video', videoQualityIndex);
    const audioData = await this.downloadMedia(videoUrl, 'audio', audioQualityIndex);

    return {
      video: videoData,
      audio: audioData,
    };
  },
};

app.get('/api/download/ytdlv2', async (req, res) => {
  try {
    const { url, videoQuality, audioQuality } = req.query;

    if (!url || !videoQuality || !audioQuality) {
      return res.status(400).json({
        success: false,
        creator: "Hello Line",
        error: "Parameters 'url', 'videoQuality', and 'audioQuality' are required.",
      });
    }

    const videoQualityIndex = parseInt(videoQuality, 10);
    const audioQualityIndex = parseInt(audioQuality, 10);

    try {
      const result = await YTDLv2.downloadVideoAndAudio(url, videoQualityIndex, audioQualityIndex);
      return res.status(200).json({
        success: true,
        creator: "Hello Line",
        result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        creator: "Hello Line",
        error: error.message,
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      success: false,
      creator: "Hello Line",
      error: 'Internal server error.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});