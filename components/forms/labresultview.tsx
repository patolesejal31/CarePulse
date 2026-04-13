"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
//@ts-ignore
import jsPDF from "jspdf";

const LabResultClient = ({
  labResults,
  userId,
}: {
  labResults: any[];
  userId: string;
}) => {
  const handleDownload = (labResult: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text("CarePulse HealthCare Platform", 105, 20, { align: "center" });
  
    // Add horizontal line below the header
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
  
    // Lab result title
    doc.setFontSize(14);
    doc.text("Lab Result Details", 105, 35, { align: "center" });
  
    // Add lab result details
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Patient Name: ${labResult.patientName}`, 20, 50);
    doc.text(`Test Name: ${labResult.testCategory}`, 20, 60);
    doc.text(`Test Specified: ${labResult.specifiedTest}`, 20, 70);
    doc.text(`Notes: ${labResult.notes}`, 20, 80);
    doc.text(`Date: ${new Date(labResult.$createdAt).toLocaleDateString()}`, 20, 90);
  
    // Table Headers
    const startX = 20;
    const startY = 100;
    const cellWidth = 40;
    const cellHeight = 10;
  
    doc.setFont("Helvetica", "bold");
    doc.text("Parameter Name", startX, startY);
    doc.text("Value", startX + cellWidth, startY);
    doc.text("Unit", startX + cellWidth * 2, startY);
    doc.text("Reference Range", startX + cellWidth * 3, startY);
  
    // Draw table rows
    doc.setFont("Helvetica", "normal");
    let rowY = startY + cellHeight;
    for (let i = 1; i <= 5; i++) {
      const parameter = labResult[`parameterName_${i}`];
      const value = labResult[`value_${i}`];
      const unit = labResult[`unit_${i}`];
      const reference = labResult[`reference_${i}`];
  
      if (!parameter) continue; // Skip rows without data
  
      doc.text(parameter || "", startX, rowY);
      doc.text(value || "", startX + cellWidth, rowY);
      doc.text(unit || "", startX + cellWidth * 2, rowY);
      doc.text(reference || "", startX + cellWidth * 3, rowY);
  
      rowY += cellHeight;
    }
  
    // Save the PDF
    doc.save(`LabResult_${labResult.patientName}.pdf`);
  };
  
  return (
    <div className="flex flex-col items-center justify-start h-screen p-4 space-y-6">
      <header className="text-center">
        <p className="text-4xl font-bold text-white">Lab Results</p>
        <p className="text-lg text-white mt-2">Your lab test details and results</p>
      </header>
      <main className="w-full max-w-4xl space-y-8">
        {labResults.map((labResult, index) => (
          <section key={labResult.$id} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Lab Result #{index + 1}
            </h2>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-700">Patient Name:</strong>{" "}
                <span className="text-gray-600">{labResult.patientName}</span>
              </p>
              <p>
                <strong className="text-gray-700">Test Name:</strong>{" "}
                <span className="text-gray-600">{labResult.testCategory}</span>
              </p>
              <p>
                <strong className="text-gray-700">Test Specified:</strong>{" "}
                <span className="text-gray-600">{labResult.specifiedTest}</span>
              </p>
              <p>
                <strong className="text-gray-700">Notes:</strong>{" "}
                <span className="text-gray-600">{labResult.notes}</span>
              </p>
              <p>
                <strong className="text-gray-700">Date:</strong>{" "}
                <span className="text-gray-600">
                  {new Date(labResult.$createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Parameter Name</th>
                  <th className="border border-gray-300 p-2 text-left">Value</th>
                  <th className="border border-gray-300 p-2 text-left">Unit</th>
                  <th className="border border-gray-300 p-2 text-left">Reference Range</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => {
                  const parameter = labResult[`parameterName_${i + 1}`];
                  const value = labResult[`value_${i + 1}`];
                  const unit = labResult[`unit_${i + 1}`];
                  const reference = labResult[`reference_${i + 1}`];

                  if (!parameter) return null; // Skip if no parameter is available

                  return (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2">{parameter}</td>
                      <td className="border border-gray-300 p-2">{value}</td>
                      <td className="border border-gray-300 p-2">{unit}</td>
                      <td className="border border-gray-300 p-2">{reference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-4">
              <Button
                variant="outline"
                className="shad-primary-btn"
                onClick={() => handleDownload(labResult)}
              >
                Download Lab Result
              </Button>
            </div>
          </section>
        ))}
        <div className="space-x-4">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/dashboard`}>Go To Dashboard</Link>
          </Button>
        </div>
      </main>
      <footer className="text-white text-sm">© 2024 CarePulse. All rights reserved.</footer>
    </div>
  );
};

export default LabResultClient;
