import React from "react";

function Feedback() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/feedbackform.pdf";
    link.download = "DRDP-CEP-feedbackform.pdf";
    link.click();
  };

  return (
    <div className="options-page">
      <h1>feedbackform</h1>
      <p>Download your feedback form.</p>
      <button className="download-btn" onClick={handleDownload}>Download Now</button>
    </div>
  );
}

export default Feedback;
