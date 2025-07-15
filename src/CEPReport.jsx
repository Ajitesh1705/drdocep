import React, { useState } from "react";
import { jsPDF } from "jspdf";

const CEPReport = () => {
  const [form, setForm] = useState({
    labName: "",
    title: "",
    startDate: "",
    endDate: "",
    duration: "",
    amountSpent: "",
    amountSanctioned: "",
    feedback: "",
    courseDirectorComments: "",
    hrdHeadComments: "",
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("CEP COMPLETION REPORT", 70, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("To be submitted by HR Head/Course Director", 20, y);
    y += 10;

    const lines = [
      `1. Name of the Organizing Lab: ${form.labName}`,
      `2. Title of the CEP: ${form.title}`,
      `3. Date: Start date: ${form.startDate}   End date: ${form.endDate}   Duration: ${form.duration} Days`,
      `4. Expenditure Details:`,
      `   Amount Spent (Rs.): ${form.amountSpent}`,
      `   Amount Sanctioned (Rs.): ${form.amountSanctioned}`,
      `5. List of Participants: Attached as Annexure A`,
      `6. Faculty Details: Attached as Annexure B`,
      `7. A copy of quiz/written test and analysis/comments of course coordinator and participants list with grade of quiz/written test.`,
      `8. Feedback (as per appendix A): ${form.feedback}`,
      `   a. feedback forms received from participants: ${form.courseDirectorComments}`,
      `   b. Comments of the Course Director & HRD Head regarding: ${form.hrdHeadComments}`,
      `9. Schedule (Title of Talk, Session time & speaker details): Attached as Annexure`,
      `* Please ensure copy of course material in soft form for displaying on DRONA is enclosed.`,
    ];

    lines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, 170);
      doc.text(wrapped, 20, y);
      y += wrapped.length * 7;
    });

    // Add signature placeholders side by side
    y += 10;
    doc.text("SIGNATURE", 40, y);
    doc.text("SIGNATURE", 140, y);
    y += 7;
    doc.text("(Director)", 40, y);
    doc.text("(Deputy Director)", 140, y);

    doc.save("CEP_Completion_Report.pdf");
  };

  return (
<div className="cep-report-form">

      <h2>CEP Completion Report Generator</h2>

      <input
        placeholder="Organizing Lab"
        value={form.labName}
        onChange={(e) => handleInputChange("labName", e.target.value)}
      />
      <input
        placeholder="Title of CEP"
        value={form.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <input
        placeholder="Start Date"
        value={form.startDate}
        onChange={(e) => handleInputChange("startDate", e.target.value)}
      />
      <input
        placeholder="End Date"
        value={form.endDate}
        onChange={(e) => handleInputChange("endDate", e.target.value)}
      />
      <input
        placeholder="Duration (Days)"
        value={form.duration}
        onChange={(e) => handleInputChange("duration", e.target.value)}
      />
      <input
        placeholder="Amount Spent (Rs)"
        value={form.amountSpent}
        onChange={(e) => handleInputChange("amountSpent", e.target.value)}
      />
      <input
        placeholder="Amount Sanctioned (Rs)"
        value={form.amountSanctioned}
        onChange={(e) => handleInputChange("amountSanctioned", e.target.value)}
      />

      <h3>PARTICIPANTS</h3>
      <p><em>Attached as Annexure A</em></p>

      <h3>FACULTY (Drdo/Non-Drdo)</h3>
      <p><em>Attached as Annexure B</em></p>

      <h3>FEEDBACK</h3>
 
      <textarea
        placeholder="comments of course director & HRD Head "
        value={form.hrdHeadComments}
        onChange={(e) => handleInputChange("hrdHeadComments", e.target.value)}
      />

      <br />
    <button className="download-btn" onClick={generatePDF}>Generate CEP Completion PDF</button>

    </div>
  );
};

export default CEPReport;

