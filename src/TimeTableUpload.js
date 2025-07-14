// src/TimeTableUpload.js
import React, { useState } from "react";

const TimeTableUpload = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="upload-page">
      <h2>Upload Time Table (PDF)</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file && <p>Uploaded: {file.name}</p>}
    </div>
  );
};

export default TimeTableUpload;
