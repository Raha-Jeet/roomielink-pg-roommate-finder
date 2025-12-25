const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const pgsRoutes = require("./routes/pgs");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5500", credentials: true })); // frontend port
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB connect (MongoDB Atlas)
mongoose.connect("YOUR_MONGO_ATLAS_URI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Error:", err));

// Dummy auth middleware (replace with real auth)
app.use((req, res, next) => {
  req.user = { id: "64f2a31bc83bba998ef12345" }; // fake userId for now
  next();
});

// Routes
app.use("/api/pgs", pgsRoutes);

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
