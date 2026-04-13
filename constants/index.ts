import { z } from "zod";

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  FeedBack:"",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/john_green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/leila_cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/david_livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/evan_peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/jane_powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/alex_remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/jasmine_lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/alyana_cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/hardik_sharma.png",
    name: "Hardik Sharma",
  },
];

const testFormSchema = z.object({
  testCategory: z.string().nonempty("Please select a test category."),
  specificTests: z.string().nonempty("Please select a specific test."),
  sampleCollectionMethod: z.string().nonempty("Please select a sample collection method."),
  sampleCollectionDateTime: z.date().nullable().refine(Boolean, "Please select a date and time."),
  fastingRequired: z.boolean().optional(),
  fastingHours: z
    .number()
    .nullable()
    .optional(),
  reportDeliveryMethod: z.string().nonempty("Please select a delivery method."),
  preferredDeliveryDate: z.date().nullable().refine(Boolean, "Please select a preferred delivery date."),
  comments: z.string().optional(),
});

export const TestCategories = [
  { name: "Blood Tests" },
  { name: "Imaging" },
  { name: "Urine Tests" },
  { name: "Biopsy" },
  { name: "Genetic Tests" },
  { name: "Pathology Tests" },
];

export const SpecificTests = [
  { name: "Complete Blood Count (CBC)" },
  { name: "Blood Glucose" },
  { name: "Lipid Panel" },
  { name: "Thyroid Function Tests (T3, T4, TSH)" },
  { name: "Liver Function Tests" },
  { name: "Kidney Function Tests" },
  { name: "Vitamin Levels (D, B12)" },
  { name: "X-Ray" },
  { name: "MRI" },
  { name: "CT Scan" },
  { name: "Ultrasound" },
  { name: "Urinalysis" },
  { name: "Pregnancy Test" },
  { name: "Drug Screening" },
];

export const SampleCollectionMethods = [
  { name: "In-home" },
  { name: "At Clinic" },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
export const CreateLabTestSchema = z.object({
  patient: z.string().min(2, "Select a valid patient"),
  doctor: z.string().min(2, "Select a valid doctor"),
  testType: z.string().min(2, "Test type must be specified"),
  sampleRequired: z.boolean(),
  sampleCollectionDate: z.coerce.date().optional(),
  reasonForTest: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  additionalNotes: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed", "cancelled"]),
});

export const UpdateLabTestSchema = z.object({
  labTestId: z.string().min(1, "Lab Test ID is required"),
  patient: z.string().min(2, "Select a valid patient").optional(),
  doctor: z.string().min(2, "Select a valid doctor").optional(),
  testType: z.string().optional(),
  sampleRequired: z.boolean().optional(),
  sampleCollectionDate: z.coerce.date().optional(),
  reasonForTest: z.string().optional(),
  additionalNotes: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed", "cancelled"]),
});

export function getLabTestSchema(type: string) {
  switch (type) {
    case "create":
      return CreateLabTestSchema;
    default:
      return UpdateLabTestSchema;
  }
};