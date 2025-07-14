import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Statement = () => {
  const [formData, setFormData] = useState({
    courseTitle: "Quantum Sensors",
    startDate: "11th Sept",
    endDate: "13th Sept 2024",
    items: [
      {
        head: "Course Material",
        amount: "",
        remarks: "Course material containing bag, notepad, pen, CD, Photograph",
      },
      { head: "Honorarium", amount: "", remarks: "Rs.1000.00 each for about 15 speakers" },
      {
        head: "Hospitality",
        amount: "",
        remarks:
          "3days lunch and tea/snack, High Tea for Inaugural function etc. for about 50 persons which includes participants, speakers, invitees and organizers",
      },
      {
        head: "TA/DA Guest Faculty",
        amount: "",
        remarks: "Transport/stay for speakers (excluding air fare)",
      },
      { head: "TA for Air Move", amount: "", remarks: "Rs. 20,000.00 each for eight speakers" },
      { head: "Certificate and Banner", amount: "", remarks: "For Participants" },
      { head: "Misc", amount: "", remarks: "For unforeseen expenditures" },
    ],
  });

  const handleAmountChange = (index, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index].amount = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleRemarksChange = (index, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index].remarks = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const amount = parseFloat(item.amount) || 0;
      return total + amount;
    }, 0);
  };


  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Statement of Case for approval of funds for conducting CEP at", 20, 20);
    doc.text("SSPL", 20, 30);

    // Course description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const courseText = `SSPL is going to organize a CEP course titled "${formData.courseTitle}". It is three days programme scheduled from ${formData.startDate} to ${formData.endDate}.`;
    const splitCourseText = doc.splitTextToSize(courseText, 170);
    doc.text(splitCourseText, 20, 45);

    const speakersText = `Eminent Speakers from esteemed institutions like IISC Bangalore, IISER Pune, SAC/PRL Ahmadabad, IITs have kindly agreed for delivering talks/The talk will be benefiting the participants form SSPL and form other DRDO labs.`;
    const splitSpeakersText = doc.splitTextToSize(speakersText, 170);
    doc.text(splitSpeakersText, 20, 60);

    const expenditureText = `The following is the estimated expenditure for the conduct of the course. The expenditure includes course material for the participants, Honorarium for the speakers, hospitality charges etc. Expert/Speakers (Non-DRDO) form outside Delhi have requested for TA/DA for their travel and stay.`;
    const splitExpenditureText = doc.splitTextToSize(expenditureText, 170);
    doc.text(splitExpenditureText, 20, 80);

    doc.setFont("helvetica", "bold");
    doc.text("The detailed breakup and estimated expenditure is as follow:", 20, 100);

    // Table data
    const tableData = formData.items.map((item, index) => [
      (index + 1).toString(),
      item.head,
      `Rs. ${item.amount || "0.00"}`,
      item.remarks,
    ]);

    // AutoTable
    autoTable(doc, {
      startY: 110,
      head: [["S.No.", "Head", "Amount", "Remarks"]],
      body: tableData,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [66, 153, 225], halign: "left" },
      columnStyles: {
        0: { cellWidth: 15 }, // S.No
        1: { cellWidth: 45 }, // Head
        2: { cellWidth: 30 }, // Amount
        3: { cellWidth: 80 }, // Remarks (wrapping)
      },
      theme: "grid",
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // Total
    doc.setFont("helvetica", "bold");
    doc.text("Total", 40, finalY);
    doc.text(`Rs.${calculateTotal().toFixed(2)}`, 90, finalY);

    // Approval text
    const approvalText = `It is requested to provide concurrence and approval as per para 6.5 of delegation of financial powers for an expenditure of Rs.${calculateTotal().toFixed(
      2
    )} for the conduct of this CEP.`;
    const splitApprovalText = doc.splitTextToSize(approvalText, 170);
    doc.setFont("helvetica", "normal");
    doc.text(splitApprovalText, 20, finalY + 15);

    // Signatures
    doc.text("Course Director / Dy. Course Director", 20, finalY + 45);
    doc.text("GD HRD", 20, finalY + 55);
    doc.text("DIRECTOR", 20, finalY + 75);
    doc.text("IFA", 20, finalY + 95);

    doc.save("CEP_Statement_of_Case.pdf");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#018ec8",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      padding: "40px",
      marginBottom: "20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#2d3748",
      marginBottom: "10px",
    },
    divider: {
      width: "100px",
      height: "4px",
      background: "linear-gradient(90deg, #4299e1, #667eea)",
      margin: "0 auto 20px",
      borderRadius: "2px",
    },
    subtitle: {
      color: "#718096",
      fontSize: "1.1rem",
    },
    section: {
      marginBottom: "30px",
      padding: "25px",
      backgroundColor: "#f7fafc",
      borderRadius: "10px",
      border: "2px solid #e2e8f0",
    },
    sectionTitle: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: "#2d3748",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
    },
    sectionIcon: {
      width: "8px",
      height: "25px",
      backgroundColor: "#4299e1",
      borderRadius: "4px",
      marginRight: "12px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#4a5568",
      marginBottom: "8px",
    },
    input: {
      padding: "12px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#4299e1",
    },
    inputReadonly: {
      backgroundColor: "#f7fafc",
      color: "#718096",
    },
    textarea: {
      padding: "12px",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none",
      minHeight: "80px",
      resize: "vertical",
    },
    budgetItem: {
      padding: "25px",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      backgroundColor: "white",
      marginBottom: "20px",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    budgetItemHover: {
      borderColor: "#4299e1",
      boxShadow: "0 4px 12px rgba(66, 153, 225, 0.15)",
    },
    totalSection: {
      padding: "25px",
      backgroundColor: "#ebf8ff",
      borderRadius: "10px",
      border: "2px solid #bee3f8",
      marginBottom: "30px",
    },
    totalText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalLabel: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#2d3748",
    },
    totalAmount: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#3182ce",
    },
    generateButton: {
      display: "block",
      margin: "0 auto",
      padding: "15px 40px",
      backgroundColor: "#4299e1",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: "0 4px 15px rgba(66, 153, 225, 0.4)",
    },
    generateButtonHover: {
      backgroundColor: "#3182ce",
      transform: "translateY(-2px)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>CEP Statement of Case Generator</h1>
          <div style={styles.divider}></div>
          <p style={styles.subtitle}>
            Fill in the amounts and modify remarks as needed, then generate the PDF
          </p>
        </div>

        {/* Course Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <div style={styles.sectionIcon}></div>
            Course Details
          </h3>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Course Title</label>
              <input
                type="text"
                value={formData.courseTitle}
                onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#4299e1")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#4299e1")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#4299e1")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
        </div>

        {/* Budget Items */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <div style={{ ...styles.sectionIcon, backgroundColor: "#48bb78" }}></div>
            Budget Items
          </h3>
          <div>
            {formData.items.map((item, index) => (
              <div
                key={index}
                style={styles.budgetItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4299e1";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(66, 153, 225, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Head</label>
                    <input
                      type="text"
                      value={item.head}
                      readOnly
                      style={{ ...styles.input, ...styles.inputReadonly }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amount (Rs.)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                      style={styles.input}
                      placeholder="0.00"
                      onFocus={(e) => (e.target.style.borderColor = "#48bb78")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Remarks</label>
                    <textarea
                      value={item.remarks}
                      onChange={(e) => handleRemarksChange(index, e.target.value)}
                      style={styles.textarea}
                      onFocus={(e) => (e.target.style.borderColor = "#48bb78")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div style={styles.totalSection}>
          <div style={styles.totalText}>
            <span style={styles.totalLabel}>Total Amount:</span>
            <span style={styles.totalAmount}>Rs. {calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={generatePDF}
            style={styles.generateButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#3182ce";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#4299e1";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Generate PDF Statement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statement;
