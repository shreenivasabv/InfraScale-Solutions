const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  designation: String,
  specialization: String,
  experience: Number,
  features: [String],
  image: String,
  password: { type: String, default: null },
  isRegistered: { type: Boolean, default: false }
});

module.exports = mongoose.model("Member", memberSchema);