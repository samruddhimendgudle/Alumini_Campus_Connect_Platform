const express = require("express");
const router = express.Router();
const Experience = require("../models/experience.model");

// GET all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Error fetching experiences" });
  }
});

// POST new experience
router.post("/", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({ message: "Error saving experience" });
  }
});

module.exports = router;