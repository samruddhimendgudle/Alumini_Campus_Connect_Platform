exports.isAlumni = (req, res, next) => {
  if (req.user.role !== "alumni") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};