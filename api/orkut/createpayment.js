const cors = require('cors');
const express = require('express');
const axios = require('axios');
const qr = require('qrcode');
const FormData = require('form-data'); 
const fs = require('fs'); 
const { v4: uuidv4 } = require('uuid'); 
const BodyForm = require('form-data');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const generateTransactionId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let transactionId = '';
  for (let i = 0; i < 8; i++) {
    transactionId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return transactionId;
};

const generateQRCode = async (qrData) => {
  try {
    const qrImageBuffer = await qr.toBuffer(qrData, { type: 'png' });
    return qrImageBuffer;
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    throw new Error('Failed to generate QR code');
  }
};

async function uploadToPomf(path) {
  try {
    const fileStream = fs.createReadStream(path);
    const formData = new BodyForm();
    formData.append('files[]', fileStream);

    const response = await axios.post('https://pomf.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data.files[0].url;
  } catch (error) {
    console.log("Error at pomf uploader:", error);
    return "error";
  }
}

app.get('/api/orkut/createpayment', async (req, res) => {
  const { apikey, amount, codeqr } = req.query;

  if (apikey !== 'line') {
    return res.status(403).json({
      error: "Isi parameter Apikey",
    });
  }

  const transactionAmount = amount;
  const qrCode = codeqr;

  if (!amount) {
    return res.status(400).json({
      error: "Isi dengan jumlah nominal",
    });
  }

  if (!codeqr) {
    return res.status(400).json({
      error: "Isi dengan Code Qriss kalian sendiri",
    });
  }

  const transactionId = generateTransactionId();

  try {
    const qrImageBuffer = await generateQRCode(qrCode);

    const filePath = `./temp-${transactionId}.png`;
    fs.writeFileSync(filePath, qrImageBuffer);
    
    const qrImageUrl = await uploadToPomf(filePath);

    fs.unlinkSync(filePath);

    return res.status(200).json({
      status: true,
      creator: "Line",
      result: {
        transactionId: transactionId, 
        amount: transactionAmount,
        expirationTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), 
        qrImageUrl: qrImageUrl, 
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to generate or upload QR code.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
