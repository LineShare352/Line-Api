const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/maker/ytcomment', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Query Params:", req.query);

    const { text, avatar, username } = req.query;

    if (!text || !avatar || !username) {
        return res.json({
            status: false,
            creator: "Hello Line", // Tambahkan creator
            result: 'Contoh penggunaan: ?text=halo&avatar=https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg&username=Line'
        });
    }

    try {
        const response = await axios.get(
            `https://some-random-api.com/canvas/misc/youtube-comment?comment=${encodeURIComponent(text)}&avatar=${encodeURIComponent(avatar)}&username=${encodeURIComponent(username)}`,
            { responseType: 'arraybuffer' } // Menerima gambar sebagai buffer
        );
        console.log("Response from External API:", response.data);

        // Kirimkan respon berupa gambar
        res.set('Content-Type', 'image/png');
        res.set('Creator', 'Hello Line'); // Tambahkan header creator
        res.send(response.data);

    } catch (err) {
        console.error("External API Error:", err.message);
        console.error("Full Error Details:", err.response ? err.response.data : err);

        const errorResponse = {
            status: false,
            creator: "Hello Line", // Tambahkan creator
            result: {
                error: err.message,
                ...(err.response && {
                    status: err.response.status,
                    data: err.response.data,
                    headers: err.response.headers
                })
            }
        };

        return res.status(500).json(errorResponse);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});