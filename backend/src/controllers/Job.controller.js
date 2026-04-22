const Job = require("../models/Job.model");
const User = require("../models/user.model");

// Get all jobs (static + alumni posted)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name company jobRole")
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
};

// Get jobs by company
exports.getJobsByCompany = async (req, res) => {
  try {
    const { company } = req.params;
    const jobs = await Job.find({ companyName: company })
      .populate("postedBy", "name company jobRole");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
};

// Post new job (Alumni only)
exports.postJob = async (req, res) => {
  try {
    const { companyName, role, salary, location, description, requirements, applyLink } = req.body;
    const userId = req.user.id; // from auth middleware

    const newJob = new Job({
      postedBy: userId,
      companyName,
      role,
      salary,
      location,
      description,
      requirements: requirements || [],
      applyLink,
      isStatic: false
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: "Error posting job", error: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Job.findByIdAndDelete(id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err.message });
  }
};