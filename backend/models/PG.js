const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // boys/girls
  location: { type: String, required: true },
  rent: { type: Number, required: true },
  capacity: { type: Number, required: true },
  contact: { type: String, required: true },
  amenities: [String],
  description: String,
  imageUrl: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // track user
}, { timestamps: true });

module.exports = mongoose.model("PG", pgSchema);
