import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const CEPReport = () => {
  const [form, setForm] = useState({
    labName: "",
    title: "",
    startDate: "",
    endDate: "",
    duration: "",
    amountSpent: "",
    amountSanctioned: "",
    participants: [{ pin: "", name: "", gender: "", rank: "", cadre: "", lab: "" }],
    faculty: [{ type: "", name: "", designation: "", institution: "", talkTitle: "" }],
    feedback: "",
    courseDirectorComments: "",
    hrdHeadComments: "",
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleTableChange = (section, index, field, value) => {
    const updated = [...form[section]];
    updated[index][field] = value;
    setForm({ ...form, [section]: updated });
  };

  const addRow = (section) => {
    const newRow =
      section === "participants"
        ? { pin: "", name: "", gender: "", rank: "", cadre: "", lab: "" }
        : { type: "", name: "", designation: "", institution: "", talkTitle: "" };
    setForm({ ...form, [section]: [...form[section], newRow] });
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
    ];

    lines.forEach((line) => {
      doc.text(line, 20, y);
      y += 8;
    });

    // Participants Table
    y += 2;
    autoTable(doc, {
      startY: y,
      head: [["S.No", "PIN", "Name", "Gender", "Rank/Desig.", "Cadre", "Lab/Estts"]],
      body: form.participants.map((p, i) => [
        i + 1,
        p.pin,
        p.name,
        p.gender,
        p.rank,
        p.cadre,
        p.lab,
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;

    // Faculty Table
    doc.text("6. Faculty Details:", 20, y);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["S.No", "DRDO/Non-DRDO", "Name", "Designation", "Institution", "Title of Talk"]],
      body: form.faculty.map((f, i) => [
        i + 1,
        f.type,
        f.name,
        f.designation,
        f.institution,
        f.talkTitle,
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      theme: "grid",
    });
    y = doc.lastAutoTable.finalY + 10;

    const remainingText = [
      `7. Please ensure copy of course material is forwarded at dhrd_cep@hqr.hqrdom for displaying on DRONA.`,
      `8. Analyzed summary of participants’ feedback (as per appendix A): ${form.feedback}`,
      `9. Comments of the Course Director: ${form.courseDirectorComments}`,
      `10. Comments of the Head HRD: ${form.hrdHeadComments}`,
      `* Please do not attach individual feedback forms.`,
    ];

    remainingText.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, 170);
      doc.text(wrapped, 20, y);
      y += wrapped.length * 7;
    });

    doc.save("CEP_Completion_Report.pdf");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
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

      <h3>Participants</h3>
      {form.participants.map((p, i) => (
        <div key={i}>
          <input placeholder="PIN" value={p.pin} onChange={(e) => handleTableChange("participants", i, "pin", e.target.value)} />
          <input placeholder="Name" value={p.name} onChange={(e) => handleTableChange("participants", i, "name", e.target.value)} />
          <input placeholder="Gender" value={p.gender} onChange={(e) => handleTableChange("participants", i, "gender", e.target.value)} />
          <input placeholder="Rank/Desig." value={p.rank} onChange={(e) => handleTableChange("participants", i, "rank", e.target.value)} />
          <input placeholder="Cadre" value={p.cadre} onChange={(e) => handleTableChange("participants", i, "cadre", e.target.value)} />
          <input placeholder="Lab/Estts" value={p.lab} onChange={(e) => handleTableChange("participants", i, "lab", e.target.value)} />
        </div>
      ))}
      <button onClick={() => addRow("participants")}>+ Add Participant</button>

      <h3>Faculty</h3>
      {form.faculty.map((f, i) => (
        <div key={i}>
          <input placeholder="DRDO/Non-DRDO" value={f.type} onChange={(e) => handleTableChange("faculty", i, "type", e.target.value)} />
          <input placeholder="Name" value={f.name} onChange={(e) => handleTableChange("faculty", i, "name", e.target.value)} />
          <input placeholder="Designation" value={f.designation} onChange={(e) => handleTableChange("faculty", i, "designation", e.target.value)} />
          <input placeholder="Institution" value={f.institution} onChange={(e) => handleTableChange("faculty", i, "institution", e.target.value)} />
          <input placeholder="Title of Talk" value={f.talkTitle} onChange={(e) => handleTableChange("faculty", i, "talkTitle", e.target.value)} />
        </div>
      ))}
      <button onClick={() => addRow("faculty")}>+ Add Faculty</button>

      <h3>Additional Info</h3>
      <textarea
        placeholder="Feedback Summary"
        value={form.feedback}
        onChange={(e) => handleInputChange("feedback", e.target.value)}
      />
      <textarea
        placeholder="Course Director Comments"
        value={form.courseDirectorComments}
        onChange={(e) => handleInputChange("courseDirectorComments", e.target.value)}
      />
      <textarea
        placeholder="Head HRD Comments"
        value={form.hrdHeadComments}
        onChange={(e) => handleInputChange("hrdHeadComments", e.target.value)}
      />

      <br />
      <button onClick={generatePDF}>Generate CEP Completion PDF</button>
    </div>
  );
};

export default CEPReport;
