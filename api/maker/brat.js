const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

// API Endpoint: /api/brat
app.get('/api/maker/brat', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Query Params:", req.query);

    const { text } = req.query;

    if (!text) {
        return res.json({
            status: false,
            creator: "Hello Line",
            result: 'Contoh penggunaan: ?text=Hello%20World'
        });
    }

    try {
        const response = await axios.get(
            `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}`,
            { responseType: 'arraybuffer' }
        );
        console.log("Response from External API:", response.data);

        res.set('Content-Type', 'image/png');
        res.set('Creator', 'Hello Line');
        res.send(response.data);

    } catch (err) {
        console.error("External API Error:", err.message);
        console.error("Full Error Details:", err.response ? err.response.data : err);

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

// Default route for 404 errors
app.use((req, res) => {
    res.status(404).json({
        status: false,
        creator: "Hello Line",
        result: "Endpoint tidak ditemukan. Contoh penggunaan: /api/brat?text=Hello%20World"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});