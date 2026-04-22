const Mentorship = require("../models/Mentorship.model");
const User = require("../models/user.model");

// Get mentor's meetings
exports.getMentorMeetings = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const meetings = await Mentorship.find({ alumniId: userId })
      .populate("studentId", "name email college")
      .sort({ scheduledDate: -1 });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meetings", error: err.message });
  }
};

// Get student's meetings
exports.getStudentMeetings = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const meetings = await Mentorship.find({ studentId: userId })
      .populate("alumniId", "name company jobRole")
      .sort({ scheduledDate: -1 });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meetings", error: err.message });
  }
};

// Get mentor dashboard stats
exports.getMentorStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const completed = await Mentorship.countDocuments({ 
      alumniId: userId, 
      status: "completed" 
    });
    
    const scheduled = await Mentorship.countDocuments({ 
      alumniId: userId, 
      status: "scheduled" 
    });

    const upcoming = await Mentorship.countDocuments({
      alumniId: userId,
      status: "scheduled",
      scheduledDate: { $gte: new Date() }
    });

    res.json({ completed, scheduled, upcoming });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};

// Get student dashboard stats
exports.getStudentStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const completed = await Mentorship.countDocuments({ 
      studentId: userId, 
      status: "completed" 
    });
    
    const scheduled = await Mentorship.countDocuments({ 
      studentId: userId, 
      status: "scheduled" 
    });

    const upcoming = await Mentorship.countDocuments({
      studentId: userId,
      status: "scheduled",
      scheduledDate: { $gte: new Date() }
    });

    res.json({ completed, scheduled, upcoming });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};

// Schedule meeting (Student initiates)
exports.scheduleMeeting = async (req, res) => {
  try {
    const { alumniId, scheduledDate } = req.body;
    const studentId = req.user.id;

    const newMeeting = new Mentorship({
      studentId,
      alumniId,
      status: "scheduled",
      scheduledDate: new Date(scheduledDate)
    });

    await newMeeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(500).json({ message: "Error scheduling meeting", error: err.message });
  }
};

// Complete meeting
exports.completeMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { notes } = req.body;
    const userId = req.user.id;

    const meeting = await Mentorship.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (meeting.alumniId.toString() !== userId && meeting.studentId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    meeting.status = "completed";
    meeting.completedDate = new Date();
    if (notes) meeting.notes = notes;

    await meeting.save();
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Error completing meeting", error: err.message });
  }
};

// Cancel meeting
exports.cancelMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user.id;

    const meeting = await Mentorship.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (meeting.alumniId.toString() !== userId && meeting.studentId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    meeting.status = "cancelled";
    await meeting.save();
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Error cancelling meeting", error: err.message });
  }
};