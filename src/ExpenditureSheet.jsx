import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Statement = () => {
  const [allotment, setAllotment] = useState({
    total: "",
    expended: "",
    balance: "",
    course: "CEP on Photonic Integrated Circuit: Technology and Applications",
    department: "Solid State Physics Laboratory Delhi",
  });

  const [items, setItems] = useState([
    {
      Expendituretobeincurredon: "",
      sno: 1,
      billNo: "",
      date: "",
      firm: "",
      billAmount: "",
      sanctioned: "",
      remaining: "",
    },
  ]);
const handleChange = (index, key, value) => {
  const updated = [...items];
  updated[index][key] = value;

  // Auto-calculate remaining = billAmount - sanctioned
  const bill = parseFloat(updated[index].billAmount || 0);
  const sanctioned = parseFloat(updated[index].sanctioned || 0);

  updated[index].remaining = (bill - sanctioned).toFixed(2);

  setItems(updated);
};

  const addRow = () => {
    setItems([
      ...items,
      {
        Expendituretobeincurredon: "",
        sno: items.length + 1,
        billNo: "",
        date: "",
        firm: "",
        billAmount: "",
        sanctioned: "",
        remaining: "",
      },
    ]);
  };

  const getLiveTotals = () => {
    const totalBill = items.reduce((sum, item) => sum + parseFloat(item.billAmount || 0), 0);
    const totalSanctioned = items.reduce((sum, item) => sum + parseFloat(item.sanctioned || 0), 0);
    const totalRemaining = items.reduce((sum, item) => sum + parseFloat(item.remaining || 0), 0);
    return {
      totalBill,
      totalSanctioned,
      totalRemaining,
    };
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EXPENDITURE SHEET", 80, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Amount of Allotment: Rs ${allotment.total}`, 20, 30);
    doc.text(`Amount already expended: Rs ${allotment.expended}`, 20, 36);
    doc.text(`Balance excluding this sheet: Rs ${allotment.balance}`, 20, 42);

    doc.text(allotment.course, 20, 52);
    doc.text(allotment.department, 20, 58);

    doc.setFont("helvetica", "bold");
    doc.text("Expenditure Details:", 20, 68);

    const body = items.map((item) => [
      item.Expendituretobeincurredon,
      item.sno.toString(),
      item.billNo,
      item.date,
      item.firm,
      item.billAmount,
      item.sanctioned,
      item.remaining,
    ]);

    const { totalBill, totalSanctioned, totalRemaining } = getLiveTotals();

    body.push([
      "Total", "", "", "", "",
      `Rs. ${totalBill.toFixed(2)}`,
      `Rs. ${totalSanctioned.toFixed(2)}`,
      `Rs. ${totalRemaining.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 75,
      head: [["Expenditure to be incurred on", "S.No.", "Bill No.", "Date", "Name of Firm", "Bill Amount", "Sanctioned", "Remaining"]],
      body,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("Expenditure_Sheet.pdf");
  };

  const { totalBill, totalSanctioned, totalRemaining } = getLiveTotals();

  return (
    <div style={{ padding: "30px", background: "#eef", minHeight: "100vh" }}>
      <h1>Expenditure Sheet Generator</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Total Allotment: </label>
        <input
          value={allotment.total}
          onChange={(e) => setAllotment({ ...allotment, total: e.target.value })}
        />
        <br />
        <label>Expended Submitted: </label>
        <input
          value={allotment.expended}
          onChange={(e) => setAllotment({ ...allotment, expended: e.target.value })}
        />
        <br />
        <label>Balance: </label>
        <input
          value={allotment.balance}
          onChange={(e) => setAllotment({ ...allotment, balance: e.target.value })}
        />
        <br />
        <label>Course Title: </label>
        <input
          value={allotment.course}
          onChange={(e) => setAllotment({ ...allotment, course: e.target.value })}
        />
        <br />
        <label>Department: </label>
        <input
          value={allotment.department}
          onChange={(e) => setAllotment({ ...allotment, department: e.target.value })}
        />
      </div>

      <h3>Expenditure Rows</h3>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            background: "#fff",
          }}
        >
          <strong>Row #{index + 1}</strong>
          <br />
          <input
            placeholder="Expenditure to be incurred on"
            value={item.Expendituretobeincurredon}
            onChange={(e) => handleChange(index, "Expendituretobeincurredon", e.target.value)}
          />
          <input
            placeholder="Bill No."
            value={item.billNo}
            onChange={(e) => handleChange(index, "billNo", e.target.value)}
          />
          <input
            placeholder="Date"
            value={item.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
          />
          <input
            placeholder="Firm"
            value={item.firm}
            onChange={(e) => handleChange(index, "firm", e.target.value)}
          />
          <input
            placeholder="Bill Amount"
            value={item.billAmount}
            onChange={(e) => handleChange(index, "billAmount", e.target.value)}
          />
          <input
            placeholder="Sanctioned"
            value={item.sanctioned}
            onChange={(e) => handleChange(index, "sanctioned", e.target.value)}
          />
          <input
            placeholder="Remaining"
            value={item.remaining}
            onChange={(e) => handleChange(index, "remaining", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addRow} style={{ padding: "10px", marginRight: "10px" }}>
        + Add Row
      </button>

      <button onClick={generatePDF} style={{ padding: "10px", background: "green", color: "#fff" }}>
        Generate Expenditure Sheet PDF
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>Running Totals </h3>
      <div><strong>Total Bill Amount:</strong> Rs. {totalBill.toFixed(2)}</div>
      <div><strong>Total Sanctioned:</strong> Rs. {totalSanctioned.toFixed(2)}</div>
      <div><strong>Total Remaining:</strong> Rs. {totalRemaining.toFixed(2)}</div>
    </div>
  );
};

export default Statement;

