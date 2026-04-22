const express = require("express");
const router = express.Router();
const { 
  getMentorMeetings,
  getStudentMeetings,
  getMentorStats,
  getStudentStats,
  scheduleMeeting,
  completeMeeting,
  cancelMeeting
} = require("../controllers/mentorship.controller");
const auth = require("../middlewares/auth.middleware");
const { isAlumni, isStudent } = require("../middlewares/role.middleware");

// Mentor routes
router.get("/mentor/meetings", auth, isAlumni, getMentorMeetings);
router.get("/mentor/stats", auth, isAlumni, getMentorStats);

// Student routes
router.get("/student/meetings", auth, isStudent, getStudentMeetings);
router.get("/student/stats", auth, isStudent, getStudentStats);

// Meeting management
router.post("/schedule", auth, isStudent, scheduleMeeting);
router.put("/:meetingId/complete", auth, completeMeeting);
router.put("/:meetingId/cancel", auth, cancelMeeting);

module.exports = router;