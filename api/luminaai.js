const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get('/api/ai/luminai', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Query Params:", req.query);
    const { content } = req.query;
    if (!content) {
        return res.json({
            status: false,
            data: 'Contoh penggunaan: ?content=hai',
        });
    }

    const url = `https://api.siputzx.my.id/api/ai/luminai?content=${encodeURIComponent(content)}`;
    try {
        const response = await axios.get(url);
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