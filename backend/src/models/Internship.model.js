const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  duration: String,
  stipend: String,
  location: String,
  description: String,
  requirements: [String],
  applyLink: String,
  isStatic: {
    type: Boolean,
    default: false // true for default internships, false for alumni posted
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);