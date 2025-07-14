import React from "react";

function NOC() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/downloads/noc-form.pdf";
    link.download = "noc-form.pdf";
    link.click();
  };

  return (
    <div className="options-page">
      <h1>No Objection Certificate (NOC)</h1>
      <p>Please download and submit the NOC.</p>
      <button className="download-btn" onClick={handleDownload}>Download Now</button>
    </div>
  );
}

export default NOC;

