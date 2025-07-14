// src/App.js
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import EnrollmentOptions from "./EnrollmentOptions";
import Statement from "./statement";
import Feedback from "./Feedback";
import NOC from "./NOC";
import Certificate from "./Certificate";
import HonorariumSlip from "./HonorariumSlip";
import CEPSettlement from "./CEPSettlement";
import TimeTableUpload from "./TimeTableUpload";
import ParticipantsUpload from "./ParticipantsUpload";
import FacultyUpload from "./FacultyUpload";
import ExpenditureSheet from "./ExpenditureSheet";
import { ProtectedAdmin, AdminCourseEditor } from "./AdminCourseEditor";
import CEPReport from "./CEPReport";

function App() {
  const [courses, setCourses] = useState([
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
  ]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-title">DRDO | CEP Courses</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home courses={courses} />} />
        <Route path="/enroll/:courseId" element={<EnrollmentOptions courses={courses} />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/noc" element={<NOC />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/HonorariumSlip" element={<HonorariumSlip />} />
        <Route path="/cep-settlement" element={<CEPSettlement />} />
        <Route path="/upload-time-table" element={<TimeTableUpload />} />
        <Route path="/upload-participants" element={<ParticipantsUpload />} />
        <Route path="/upload-faculty" element={<FacultyUpload />} />
        <Route path="/expenditure-sheet" element={<ExpenditureSheet />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminCourseEditor courses={courses} setCourses={setCourses} />
            </ProtectedAdmin>
          }
        />
        <Route path="/cep-report" element={<CEPReport />} />
      </Routes>
    </div>
  );
}

function Home({ courses }) {
  const navigate = useNavigate();

  return (
    <div>
      <header className="hero">
        <h1>Continuing Education Programme</h1>
        <p>CEP Courses by DRDO</p>
      </header>
      <section className="course-list">
        <h2>Available Courses</h2>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  );
}

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>
        <strong>Director:</strong> {course.director}
      </p>
      <p>
        <strong>Deputy:</strong> {course.deputy}
      </p>
      <button onClick={() => navigate(`/enroll/${course.id}`)}>Enroll Now</button>
    </div>
  );
}

export default App;
