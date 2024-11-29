const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const apiKey = 'AIzaSyAajE2Y-Kgl8bjPyFvHQ-PgRUSMWgBEsSk';
const cx = 'e5c2be9c3f94c4bbb';

app.get('/api/search/google', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Query Params:", req.query);
    const { text } = req.query;
    if (!text) {
        return res.json({
            status: false,
            data: 'Contoh penggunaan: ?text=halo',
        });
    }
    const query = encodeURIComponent(text);
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;
    try {
        const response = await axios.get(url);
        const items = response.data.items;

        if (items && items.length > 0) {
            return res.json({
                status: true,
                creator: "Hello Line",  
                data: items.map(item => ({
                    title: item.title,
                    description: item.snippet,
                    link: item.link,
                })),
            });
        }
        return res.json({
            status: false,
            creator: "Hello Line",  
        });
    } catch (err) {
        console.error("Error in Google API:", err.message);
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
