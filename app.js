const express = require("express");
const app = express();
const features = require("./features/express");

// Middleware untuk membuat JSON rapi
app.set("json spaces", 2);

// Gunakan router fitur
app.use("/features", features);

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});