const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  role: String,
  rounds: Number,
  roundDetails: String,
  overallExperience: String,
  suggestion: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Experience", experienceSchema);