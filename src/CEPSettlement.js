import React from "react";
import { Link } from "react-router-dom";

const CEPSettlement = () => {
  return (
    <div className="cep-settlement-page">
      <h2>CEP Settlement Options</h2>

      <Link to="/expenditure-sheet" className="option-card clickable">
        <h3>Expenditure Sheet</h3>
      </Link>

      <Link to="/cep-report" className="option-card clickable">
        <h3>CEP completion report</h3>
      </Link>

      <Link to="/upload-time-table" className="option-card clickable">
        <h3>Time Table (Upload PDF)</h3>
      </Link>

      <Link to="/upload-participants" className="option-card clickable">
        <h3>List of Participants_(ANNEXURE A)(Upload Excel)</h3>
      </Link>

      <Link to="/upload-faculty" className="option-card clickable">
        <h3>List of Faculty_(ANNEXURE B) (Upload Excel)</h3>
      </Link>
    </div>
  );
};

export default CEPSettlement;


