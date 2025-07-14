import React from "react";

function Certificate() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/certificate.pdf";
    link.download = "DRDP-CEP-certificate.pdf";
    link.click();
  };

  return (
    <div className="options-page">
      <h1>Certificate</h1>
      <p>Download your course completion certificate.</p>
      <button className="download-btn" onClick={handleDownload}>Download Now</button>
    </div>
  );
}

export default Certificate;
