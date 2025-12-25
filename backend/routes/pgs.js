const express = require("express");
const multer = require("multer");
const PG = require("../models/PG");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 🟢 Add PG
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, type, location, rent, capacity, contact, amenities, description } = req.body;

    const pg = new PG({
      name,
      type,
      location,
      rent,
      capacity,
      contact,
      amenities: amenities ? amenities.split(",") : [],
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      userId: req.user.id   // ✅ auth middleware থেকে আসবে
    });

    await pg.save();
    res.status(201).json({ success: true, message: "PG Added Successfully", pg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get all PGs
router.get("/", async (req, res) => {
  try {
    const pgs = await PG.find();
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get logged-in user's PGs
router.get("/mine", async (req, res) => {
  try {
    const pgs = await PG.find({ userId: req.user.id });
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Delete PG
router.delete("/:id", async (req, res) => {
  try {
    const pg = await PG.findOne({ _id: req.params.id, userId: req.user.id });
    if (!pg) return res.status(404).json({ error: "PG not found or not yours" });

    await PG.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "PG removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
