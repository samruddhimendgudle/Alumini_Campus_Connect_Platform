const Internship = require("../models/Internship.model");

// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find()
      .populate("postedBy", "name company jobRole")
      .sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Error fetching internships", error: err.message });
  }
};

// Get internships by company
exports.getInternshipsByCompany = async (req, res) => {
  try {
    const { company } = req.params;
    const internships = await Internship.find({ companyName: company })
      .populate("postedBy", "name company jobRole");
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Error fetching internships", error: err.message });
  }
};

// Post new internship (Alumni only)
exports.postInternship = async (req, res) => {
  try {
    const { companyName, role, duration, stipend, location, description, requirements, applyLink } = req.body;
    const userId = req.user.id; // from auth middleware

    const newInternship = new Internship({
      postedBy: userId,
      companyName,
      role,
      duration,
      stipend,
      location,
      description,
      requirements: requirements || [],
      applyLink,
      isStatic: false
    });

    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (err) {
    res.status(500).json({ message: "Error posting internship", error: err.message });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const internship = await Internship.findById(id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    if (internship.postedBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Internship.findByIdAndDelete(id);
    res.json({ message: "Internship deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting internship", error: err.message });
  }
};