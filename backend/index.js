const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const fs = require('fs'); // Added to ensure folder exists

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // Only need this once
app.use(express.urlencoded({ extended: true })); // Essential for Multer/Form-data

// --- STATIC FILES (IMAGES) ---
// This tells Express to serve the "uploads" folder so frontend can see images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// HELPER: Automatically create the uploads folder if it doesn't exist
// This prevents Multer from crashing with a 500 error
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message); // This will show the "SSL alert 80" or "IP Whitelist" error if it fails
  });

// --- ADMIN SEEDING LOGIC ---
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

async function createDefaultAdmin() {
  try {
    const existing = await Admin.findOne({ email: "admin@infrascale.com" });
    if (!existing) {
      const hashed = await bcrypt.hash("admin123", 10);
      await Admin.create({
        email: "admin@infrascale.com",
        password: hashed
      });
      console.log("Default Admin Created");
    }
  } catch (err) {
    console.error("Admin seeding error:", err.message);
  }
}
createDefaultAdmin();

// --- ROUTES ---
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));

// Member Profile & Dashboard
app.use("/api/member-auth", require("./routes/MemberAuthRoutes"));
app.use("/api/member-profile", require("./routes/MemberProfileRoutes"));

;


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});