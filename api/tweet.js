const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(express.json()); // Untuk parsing JSON payload

app.post('/api/tweet.js', async (req, res) => {
    console.log("HTTP Method:", req.method);
    console.log("Request Body:", req.body);

    const {
        name = "John Doe",           // Default name
        username = "@johndoe",       // Default username
        tweetText = "Hello, world!", // Default tweet text
        profile = "https://cdn.arifzyn.tech/f/886z70cc.jpg",                // Default profile picture URL
        image = "https://cdn.arifzyn.tech/f/886z70cc.jpg",                  // Default tweet image URL
        theme = "dark",              // Default theme
        retweets = 150,                // Default retweets
        quotes = 20,                  // Default quotes
        likes = 30,                   // Default likes
        client = "Twitter Web App"   // Default client
    } = req.body;

    // Validasi input
    if (!tweetText) {
        return res.json({
            status: false,
            creator: "Hello Line", // Creator
            result: 'Error: Parameter "tweetText" is required.'
        });
    }

    try {
        const config = {
            name,
            username,
            tweetText,
            profile,
            image,
            theme,
            retweets,
            quotes,
            likes,
            client
        };

        console.log("Sending Payload to External API:", config);

        const response = await axios.post(
            "https://tweetgen.my.id/api/generate-tweet",
            config,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: 'arraybuffer' // Untuk menerima gambar
            }
        );

        console.log("Response from External API:", response.data);

        // Mengirimkan gambar hasil tweet
        res.set('Content-Type', 'image/png');
        res.set('Creator', 'Hello Line'); // Tambahkan header creator
        res.send(response.data);

    } catch (err) {
        console.error("External API Error:", err.message);
        console.error("Full Error Details:", err.response ? err.response.data : err);

        const errorResponse = {
            status: false,
            creator: "Hello Line", // Creator
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