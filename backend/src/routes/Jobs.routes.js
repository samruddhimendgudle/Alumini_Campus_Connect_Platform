const express = require("express");
const router = express.Router();
const { 
  getAllJobs, 
  getJobsByCompany, 
  postJob, 
  deleteJob 
} = require("../controllers/job.controller");
const auth = require("../middlewares/auth.middleware");
const { isAlumni } = require("../middlewares/role.middleware");

// GET all jobs
router.get("/", getAllJobs);

// GET jobs by company
router.get("/company/:company", getJobsByCompany);

// POST new job (alumni only)
router.post("/", auth, isAlumni, postJob);

// DELETE job (alumni only)
router.delete("/:id", auth, isAlumni, deleteJob);

module.exports = router;