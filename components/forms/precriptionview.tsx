"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
//@ts-ignore
import jsPDF from "jspdf";
import { messaging } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";

const PrescriptionClient = ({
  prescriptions,
  userId,
}: {
  prescriptions: any[];
  userId: string;
}) => {
  const handleDownload = (prescription: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text("CarePulse HealthCare Platform", 105, 20, { align: "center" });
  
    // Add horizontal line below the header
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
  
    // Prescription title
    doc.setFontSize(14);
    doc.text("Prescription Details", 105, 35, { align: "center" });
  
    // Add prescription details
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    const details = `
      Patient Name: ${prescription.patientName}
      Doctor Name: ${prescription.doctorName}
      Medicine Name: ${prescription.medicationName}
      Dosage: ${prescription.dosage}
      Frequency: ${prescription.frequency}
      Notes: ${prescription.notes}
      Date: ${new Date(prescription.$createdAt).toLocaleDateString()}
    `;
    const detailsArray = details.trim().split("\n");
  
    // Print details line by line
    let yOffset = 50; // Start height for details
    detailsArray.forEach((line) => {
      doc.text(line.trim(), 20, yOffset);
      yOffset += 10; // Increase Y offset for next line
    });
  
    // Save as PDF
    doc.save(`Prescription_${prescription.patientName}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen p-4 space-y-6">
      <header className="text-center">
        <p className="text-4xl font-bold text-white">Prescription Details</p>
        <p className="text-lg text-white mt-2">Your prescribed medications and instructions</p>
      </header>
      <main className="w-full max-w-4xl space-y-8">
        {prescriptions.map((prescription, index) => (
          <section key={prescription.$id} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Prescription #{index + 1}
            </h2>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-700">Patient Name:</strong>{" "}
                <span className="text-gray-600">{prescription.patientName}</span>
              </p>
              <p>
                <strong className="text-gray-700">Doctor Name:</strong>{" "}
                <span className="text-gray-600">{prescription.doctorName}</span>
              </p>
              <p>
                <strong className="text-gray-700">Medicine Name:</strong>{" "}
                <span className="text-gray-600">{prescription.medicationName}</span>
              </p>
              <p>
                <strong className="text-gray-700">Dosage:</strong>{" "}
                <span className="text-gray-600">{prescription.dosage}</span>
              </p>
              <p>
                <strong className="text-gray-700">Frequency:</strong>{" "}
                <span className="text-gray-600">{prescription.frequency}</span>
              </p>
              <p>
                <strong className="text-gray-700">Notes:</strong>{" "}
                <span className="text-gray-600">{prescription.notes}</span>
              </p>
              <p>
                <strong className="text-gray-700">Date:</strong>{" "}
                <span className="text-gray-600">
                  {new Date(prescription.$createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="shad-primary-btn"
                onClick={() => handleDownload(prescription)}
              >
                Download Prescription
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
      <footer className="text-white text-sm">© 2025 CarePulse. All rights reserved.</footer>
    </div>
  );
};

export default PrescriptionClient;
