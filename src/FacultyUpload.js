// src/FacultyUpload.js
import React, { useState } from "react";

const FacultyUpload = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="upload-page">
      <h2>Upload List of Faculty (Excel)</h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file && <p>Uploaded: {file.name}</p>}
    </div>
  );
};

export default FacultyUpload;
