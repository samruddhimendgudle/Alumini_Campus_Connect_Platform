// initiating the server i.e. creating an instance of express and use middlewares and routes
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/experience", require("./routes/experience.routes"));
app.use("/api/jobs", require("./routes/jobs.routes"));
app.use("/api/internships", require("./routes/internships.routes"));
app.use("/api/mentorship", require("./routes/mentorship.routes"));
app.use("/api/chat", require("./routes/chat.routes"));

module.exports = app;