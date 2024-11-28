const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/npm.js', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Query Params:", req.query);

    const { text } = req.query;

    if (!text) {
        return res.json({
            status: false,
            creator: "Hello Line", 
            data: 'Contoh penggunaan: ?text=axios',
        });
    }

    const url = `http://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(text)}`;

    try {
        const response = await axios.get(url);
        const { objects } = response.data;

        if (!objects.length) {
            return res.json({
                status: false,
                creator: "Hello Line", 
                data: 'Tidak ditemukan hasil untuk pencarian Anda',
            });
        }

        const data = objects.map(({ package: pkg }) => ({
            name: pkg.name,
            version: pkg.version,
            npm: pkg.links.npm,
            description: pkg.description,
        }));

        return res.json({
            status: true,
            creator: "Hello Line", 
            data,
        });
    } catch (err) {
        console.error("Error in NPM API:", err.message);
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