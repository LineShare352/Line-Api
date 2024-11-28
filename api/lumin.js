const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.post('/api/lumin', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Request Body:", req.body);
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'Bad Request: Parameter "text" is required.',
        });
    }

    const url = 'https://luminai.my.id/';
    try {
        const response = await axios.post(url, { content: text }); // Mengirim `text` sebagai `content`
        const { result } = response.data; // Mengambil `result` dari respons API Luminai

        return res.status(200).json({
            status: true,
            result, // Mengembalikan hasil dari API
        });
    } catch (err) {
        console.error("Error in Luminai API:", err.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error: Failed to fetch data from Luminai API.',
            error: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
