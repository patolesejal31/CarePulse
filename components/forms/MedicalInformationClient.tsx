"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePatient } from "@/lib/actions/patient.actions";
import Link from "next/link";

const MedicalInformationClient = ({
  patient,
  userId,
}: {
  patient: any;
  userId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: patient.name || "",
    phone: patient.phone || "",
    email: patient.email || "",
    gender: patient.gender || "",
    birthDate: patient.birthDate || "",
    address: patient.address || "",
    occupation: patient.occupation || "",
    allergies: patient.allergies || "",
    currentMedication: patient.currentMedication || "",
    pastMedicalHistory: patient.pastMedicalHistory || "",
    familyMedicalHistory: patient.familyMedicalHistory || "",
    primaryPhysician: patient.primaryPhysician || "",
    insuranceProvider: patient.insuranceProvider || "",
    insurancePolicyNumber: patient.insurancePolicyNumber || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving patient data:", { userId, formData });
  
      const patientToUpdate = {
        userId,
        patientId: patient?.$id!,
        patientData: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          gender: formData.gender,
          birthDate: new Date(formData.birthDate),
          address: formData.address,
          occupation: formData.occupation,
          allergies: formData.allergies,
          currentMedication: formData.currentMedication,
          pastMedicalHistory: formData.pastMedicalHistory,
          familyMedicalHistory: formData.familyMedicalHistory,
          primaryPhysician: formData.primaryPhysician,
          insuranceProvider: formData.insuranceProvider,
          insurancePolicyNumber: formData.insurancePolicyNumber,
        },
      };
  
      const updatedPatient = await updatePatient(patientToUpdate);
      console.log("Updated patient information:", updatedPatient);
  
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving patient information:", error);
    }
  };
  
      

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      name: patient.name || "",
      phone: patient.phone || "",
      email: patient.email || "",
      gender: patient.gender || "",
      birthDate: patient.birthDate || "",
      address: patient.address || "",
      occupation: patient.occupation || "",
      allergies: patient.allergies || "",
      currentMedication: patient.currentMedication || "",
      pastMedicalHistory: patient.pastMedicalHistory || "",
      familyMedicalHistory: patient.familyMedicalHistory || "",
      primaryPhysician: patient.primaryPhysician || "",
      insuranceProvider: patient.insuranceProvider || "",
      insurancePolicyNumber: patient.insurancePolicyNumber || "",
    }));
    setIsEditing(false);
  };
  

  return (
    <div className="flex flex-col items-center justify-start h-screen  p-4 space-y-6">
       <header className="text-center">
        <p className="text-4xl font-bold text-white">Medical Information</p>
        <p className="text-lg text-white mt-2">Details about your health records</p>
    </header>
      <main className="w-full max-w-4xl space-y-8">
        <section className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold text-gray-700">Medical Details</h2>
            
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <strong className="text-gray-700 capitalize space-x-2">
                {key.replace(/([A-Z])/g, " $1")}:
              </strong>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  //@ts-ignore
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              ) : (
                <span className="text-gray-600">
                    {//@ts-ignore
                     formData[key]}
                    </span>
              )}
            </div>
          ))}
        </section>

        <div className="space-x-4">
          {!isEditing ? (
            <Button variant="outline" className="shad-primary-btn" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <>
              <Button variant="outline" className="shad-primary-btn" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline" className="shad-primary-btn" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/dashboard`}>Go To Dashboard</Link>
          </Button>
        </div>
      </main>

      <footer className="text-white text-sm">© 2025 CarePulse. All rights reserved.</footer>
    </div>
  );
};

export default MedicalInformationClient;
