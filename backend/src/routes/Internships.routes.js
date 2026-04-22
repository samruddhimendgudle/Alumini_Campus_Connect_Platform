const express = require("express");
const router = express.Router();
const { 
  getAllInternships, 
  getInternshipsByCompany, 
  postInternship, 
  deleteInternship 
} = require("../controllers/internship.controller");
const auth = require("../middlewares/auth.middleware");
const { isAlumni } = require("../middlewares/role.middleware");

// GET all internships
router.get("/", getAllInternships);

// GET internships by company
router.get("/company/:company", getInternshipsByCompany);

// POST new internship (alumni only)
router.post("/", auth, isAlumni, postInternship);

// DELETE internship (alumni only)
router.delete("/:id", auth, isAlumni, deleteInternship);

module.exports = router;