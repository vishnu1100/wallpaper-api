const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const wallpapersDir = path.join(__dirname, "public/wallpapers");

// API endpoint to get wallpapers dynamically
app.get("/api/wallpapers", (req, res) => {
  fs.readdir(wallpapersDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read wallpapers" });
    }

    const wallpapers = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file)) // Only image files
      .map(file => ({
        title: path.basename(file, path.extname(file)), // Remove extension
        url: `/wallpapers/${file}`,
      }));

    res.json(wallpapers);
  });
});

// Serve images statically
app.use("/wallpapers", express.static(wallpapersDir));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
