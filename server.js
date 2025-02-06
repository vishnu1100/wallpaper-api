const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

// Set up multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the folder to save uploaded images
    cb(null, path.join(__dirname, "public/wallpapers"));
  },
  filename: (req, file, cb) => {
    // Use the original file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Path to the wallpapers directory
const wallpapersDir = path.join(__dirname, "public/wallpapers");
const mobwallpapersDir = path.join(__dirname, "public/mobile");



// Serve the index.html page at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html')); // Adjust the path to where your index.html is located
});





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
        url: `https://wallpaper-api-41jy.onrender.com/api/wallpapers/${file}`,  // Correct URL path for static files
      }));

    res.json(wallpapers);
  });
});

// API endpoint to get wallpapers dynamically
app.get("/api/wallpapers/mobile", (req, res) => {
  fs.readdir(mobwallpapersDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read wallpapers" });
    }

    const wallpapers = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file)) // Only image files
      .map(file => ({
        title: path.basename(file, path.extname(file)), // Remove extension
        url: `https://wallpaper-api-41jy.onrender.com/api/wallpapers/mobile${file}`,  // Correct URL path for static files
      }));

    res.json(wallpapers);
  });
});

// Serve images statically from the /wallpapers route
app.use("/api/wallpapers", express.static(wallpapersDir));  // Corrected path
app.use("/api/wallpapers/mobile", express.static(mobwallpapersDir));  // Corrected path

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
