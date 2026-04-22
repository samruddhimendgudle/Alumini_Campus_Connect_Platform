const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const { isAlumni, isStudent } = require("../middlewares/role.middleware");

// POST /api/auth/register
router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, (req, res) => {    
  res.json({ user: req.user });
});

router.get("/alumni-dashboard", auth, isAlumni, (req, res) => {
  res.json({ msg: "Welcome Alumni" });
});

router.get("/student-dashboard", auth, isStudent, (req, res) => {
  res.json({ msg: "Welcome Student" });
});

module.exports = router;