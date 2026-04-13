import { databases } from "@/lib/appwrite.config";
import { Models, Query } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
export interface LabTest extends Models.Document {
  patient: Patient;
  doctor: string; // Name of the doctor ordering the test
  labTechnician: string | null; // Assigned lab technician (if any)
  testType: string; // Type of test, e.g., "Blood Test", "X-Ray"
  sampleRequired: boolean; // Whether a sample (e.g., blood) is required
  sampleCollectionDate: Date | null; // Date when the sample will be collected
  reportUploadDate: Date | null; // Date when the report was uploaded
  reportUrl: string | null; // Link to the uploaded test report
  result: string | null; // Test result summary
  status: LabTestStatus; // "pending", "in-progress", "completed", "cancelled"
  reasonForTest: string; // Why the test was ordered
  additionalNotes: string | undefined; // Any other relevant details
  userId: string; // Reference to the patient user ID
}

 // Adjust import as needed




