import React from "react";
import { useParams, Link } from "react-router-dom";

function EnrollmentOptions({ courses }) {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === parseInt(courseId));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="enrollment-page">
      <div className="enrollment-header">
        <h1 className="course-title">{course.title}</h1>
      </div>
      
      <div className="options-container">
        <h2>Course Options</h2>
        <div className="options-grid">
          <Link to="/statement" className="option-card statement">
            <h3>Statement of Course</h3>
          </Link>
          <Link to="/feedback" className="option-card feedback">
            <h3>Course Feedback _(APPENDIX A)</h3>
          </Link>
          <Link to="/noc" className="option-card noc">
            <h3>NOC For Photograph</h3>
          </Link>
          <Link to="/certificate" className="option-card certificate">
            <h3>Completion Certificate_(APPENDIX E)</h3>
          </Link>
          <Link to="/Honorariumslip" className="option-card honorarium">
            <h3>Honorarium Slip/Transport receipt</h3>
          </Link>
          <Link to="/cep-settlement" className="option-card settlement">
            <h3>CEP Settlement</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentOptions;