const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());

const randomUser = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];
    return {
      success: true,
      author: "Hello Line",
      result: {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        location: `${user.location.city}, ${user.location.country}`,
        picture: user.picture.large,
      },
      request_at: new Date(),
    };
  } catch (error) {
    console.error("Error fetching random user:", error.message);
    return { success: false, error: "Failed to fetch random user." };
  }
};

app.get('/api/random/user', async (req, res) => {
  const userData = await randomUser();
  return res.status(userData.success ? 200 : 500).json(userData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});