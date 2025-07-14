// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let courses = [
  {
    id: 2,
    title: "Readout Electronics for Solid-State Image Sensors",
    director: "Dr. R.S. Saxena",
    deputy: "Mrs. Nilima Singh",
  },
  {
    id: 3,
    title: "Advanced Piezoelectric Material and Devices",
    director: "Sh. Manish Kumar Sinha",
    deputy: "Chirag Sharma",
  },
  {
    id: 4,
    title: "Current & Futuristic MEMS Technologies for Defence Applications",
    director: "Mr. Milap Singh",
    deputy: "Mr. Amit Kumar Vishwakarma",
  },
  {
    id: 5,
    title: "Acoustic Emission Technology: Its Application for Defence and Industries",
    director: "Sushil Kumar Singh",
    deputy: "Mr. Amit Kumar",
  },
];

app.post("/api/update-course", (req, res) => {
  const { id, title, director, deputy } = req.body;
  const index = courses.findIndex((c) => c.id === id);
  if (index !== -1) {
    courses[index] = { id, title, director, deputy };
    console.log("Course updated:", courses[index]);
    return res.status(200).json({ success: true, updatedCourse: courses[index] });
  }
  return res.status(404).json({ success: false, message: "Course not found" });
});

app.listen(3001, () => console.log("✅ Backend running at http://localhost:3001"));

