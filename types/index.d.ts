/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
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

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

declare type LabTestStatus = "pending" | "in-progress" | "completed" | "cancelled";

declare type CreateLabTestParams = {
  userId: string;
  patient: string;
  primaryPhysician: string; // Name of the doctor ordering the test
  testCategory: string; 
  specifiedTest:string;// Type of test, e.g., "Blood Test", "X-Ray"
  sampleCollectionDate: Date ; // Date for sample collection
  sampleCollectionMethod: string; 
  comment:string;
};

declare type UpdateLabTestParams = {
  labTestId: string;
  userId: string;
  labTest: LabTest; // Lab test details to update
  type: string; // Type of update: "progress", "complete", or "cancel"
};