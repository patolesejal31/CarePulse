import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
};




export const UpdateLabTestSchema = z.object({
  testId: z.string().min(1, "Test ID is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  testCategory: z.string().min(2, "Test category must be at least 2 characters"),
  specificTests: z
    .array(z.string().min(2, "Each test name must be at least 2 characters"))
    .optional(),
  sampleCollectionMethod: z.string().min(2, "Sample collection method is required"),
  sampleCollectionDateTime: z.coerce.date().optional(),
  fastingRequired: z.boolean().optional(),
  fastingHours: z
    .number()
    .optional()
    .refine(
      (val) => val === undefined || (val >= 1 && val <= 24),
      "Fasting hours must be between 1 and 24"
    ),
  reportDeliveryMethod: z.string().optional(),
  preferredDeliveryDate: z.coerce.date().optional(),
  comments: z.string().max(500, "Comments cannot exceed 500 characters").optional(),
});

export const CancelLabTestSchema = z.object({
  testId: z.string().min(1, "Test ID is required"),
  cancellationReason: z
    .string()
    .min(2, "Cancellation reason must be at least 2 characters")
    .max(500, "Cancellation reason cannot exceed 500 characters"),
});

export const LabTestResultSchema = z.object({
  testId: z.string().min(1, "Test ID is required"),
  results: z
    .array(
      z.object({
        testName: z.string().min(2, "Test name must be at least 2 characters"),
        resultValue: z.string().min(1, "Result value is required"),
        units: z.string().min(1, "Units are required"),
        referenceRange: z.string().optional(),
        comments: z.string().max(500, "Comments cannot exceed 500 characters").optional(),
      })
    )
    .nonempty("At least one test result must be provided"),
});

export const RescheduleLabTestSchema = z.object({
  testId: z.string().min(1, "Test ID is required"),
  newSampleCollectionDateTime: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reschedule reason must be at least 2 characters")
    .max(500, "Reason cannot exceed 500 characters"),
});

export function getLabTestSchema(type: string) {
  switch (type) {
    
    case "update":
      return UpdateLabTestSchema;
    case "cancel":
      return CancelLabTestSchema;
    case "result":
      return LabTestResultSchema;
    case "reschedule":
      return RescheduleLabTestSchema;
    default:
      throw new Error("Invalid lab test schema type");
  }
}

