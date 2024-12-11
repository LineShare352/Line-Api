const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const getMutasiQRIS = async (merchant, keyorkut) => {
  try {
    const url = `https://gateway.okeconnect.com/api/mutasi/qris/${merchant}/${keyorkut}`;
    const response = await axios.get(url);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching QRIS mutations:', error.message);
    return {
      success: false,
      error: 'Failed to fetch QRIS mutations. Please check the merchant or keyorkut values.',
    };
  }
};

app.get('/api/orkut/cekstatus', async (req, res) => {
  const { apikey, merchant, keyorkut } = req.query;

  if (apikey !== 'line') {
    return res.status(403).json({
      error: "Isi parameter Apikey",
    });
  }

  if (!merchant) {
    return res.status(400).json({
      error: "Isi Parlementer Merchant",
    });
  }

  if (!keyorkut) {
    return res.status(400).json({
      error: "Isi Parlementer Keyorkut",
    });
  }

  const result = await getMutasiQRIS(merchant, keyorkut);
  return res.status(result.success ? 200 : 500).json(result);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
