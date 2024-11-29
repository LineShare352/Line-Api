const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

// Menghilangkan `/brat.js`, cukup gunakan `/api`
app.get('/api/brat', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Query Params:", req.query);

    const { text } = req.query;

    // Jika tidak ada query `text`
    if (!text) {
        return res.json({
            status: false,
            creator: "Hello Line", 
            result: 'Contoh penggunaan: ?text=siapa'
        });
    }

    try {
        // Panggil API eksternal
        const response = await axios.get(
            `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}`,
            { responseType: 'arraybuffer' }
        );
        console.log("Response from External API:", response.data);

        // Respon berupa gambar
        res.set('Content-Type', 'image/png');
        res.set('Creator', 'Hello Line'); 
        res.send(response.data);

    } catch (err) {
        console.error("External API Error:", err.message);
        console.error("Full Error Details:", err.response ? err.response.data : err);

        // Kirimkan error jika API eksternal gagal
        const errorResponse = {
            status: false,
            creator: "Hello Line", 
            result: {
                error: err.message,
                ...(err.response && {
                    status: err.response.status,
                    data: err.response.data,
                    headers: err.response.headers
                })
            }
        };
        return res.json(errorResponse);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
