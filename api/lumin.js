const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

app.get("/api/lumin", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: "Mau Tanya Apa?" });
  async function lumin {
  }
  const data = lumin(text)
  if (!data) return res.status(404).json({ error: "No data found." });
  res.json({ status: true, creator: "Line", result: data });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
