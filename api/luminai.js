const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(express.json()); // Middleware untuk mem-parsing JSON

app.post('/api/luminai', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Request Body:", req.body);
    const { text } = req.body;

    if (!text) {
        return res.json({
            status: false,
            data: 'Contoh penggunaan: { "text": "halo" }',
        });
    }

    const url = 'https://luminai.my.id/';
    try {
        const response = await axios.post(url, { content: text }); // Mengirim `text` sebagai `content`
        const data = response.data;

        return res.json({
            status: true,
            creator: "Hello Line",
            data,
        });
    } catch (err) {
        console.error("Error in Luminai API:", err.message);
        return res.json({
            status: false,
            creator: "Hello Line",
            data: { error: err.message },
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
