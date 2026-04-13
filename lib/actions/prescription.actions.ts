// Ensure you're correctly importing Appwrite configuration

import { ID, Query } from "node-appwrite";
import { databases, DOCTOR_COLLECTION_ID, messaging } from "../appwrite.config";
import { parseStringify } from "../utils";

export const sendSMS = async (userId: string, content: string) => {
  try {
    await messaging.createSms(ID.unique(), content, [], [userId]);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};


/*export const createPrescription = async (prescription: {
  doctorId: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  notes?: string;
}) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!, // Replace with your Database ID
      process.env.NEXT_PUBLIC_PRESCRIPTION_COLLECTION_ID!, // Replace with your Collection ID
      "unique()", // Generate a unique ID for the document
      prescription
    );

    return response;
  } catch (error) {
    console.error("Error creating prescription:", error);
    throw error;
  }
};
*/
export const getPrescription = async (doctorId: string) => {
  try {
    const patients = await databases.listDocuments(
      "672cd052000155a2740d",
      "677f931f001d0746bbb0",
      [Query.equal("doctorId", [doctorId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};
const getUserIdFromPatientName = async (patientName: string) => {
  try {
    const patients = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your Database ID
      "672cd0d0001fddb6fe4c", // Replace with your Patient Collection ID
      [Query.equal("name", patientName)] // Query by patientName
    );

    if (patients.documents.length > 0) {
      return patients.documents[0].userId; // Assuming each patient has a userId field
    } else {
      throw new Error(`No patient found with the name ${patientName}`);
    }
  } catch (error) {
    console.error("Error retrieving userId from patientName:", error);
    throw error;
  }
};

export const createPrescriptions = async (prescription: {
  doctorId: string;
  patientName: string;
  medicines: { name: string; dosage: string; frequency: string }[];
  date: Date;
  notes?: string;
  userId:string;
}) => {
  try {
    const userId = await getUserIdFromPatientName(prescription.patientName);
    console.log(userId);
    const response = await databases.createDocument(
      
      "672cd052000155a2740d", // Replace with your Database ID
      "677f931f001d0746bbb0", // Replace with your Collection ID
      "unique()", // Generate a unique ID for the document
      prescription
    );
    console.log(userId);
    const smsMessage = `Greetings from CarePulse. A new prescription has been provided by Dr. ${prescription.doctorId}. Please log in to your account to download it.`;
    await sendSMSNotification(userId, smsMessage);
    return response;
  } catch (error) {
    console.error("Error creating prescription:", error);
    throw error;
  }
};
 

export const createPrescription = async (prescription: {
  doctorName: string;
  patientName: string;
  medicines: { name: string; dosage: string; frequency: string }[];
  date: Date;
  notes?: string;
}) => {
  try {
    // Step 1: Create the prescription in the database.
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PRESCRIPTION_COLLECTION_ID!,
      ID.unique(),
      prescription
    );

    // Step 2: Compose the SMS content.
    const smsContent = `Greetings from CarePulse. A new prescription has been issued by Dr. ${prescription.doctorName}. Log in to your account to download it.`;

    // Step 3: Send SMS to the patient using `patientName`.
    // Fetch the patient’s userId using their name.
    const user = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("name", [prescription.patientName])]
    );

    if (user.documents.length === 0) {
      throw new Error(`No user found with name: ${prescription.patientName}`);
    }

    const userId = user.documents[0].userId; // Replace 'userId' with the actual field name in your collection.
    await sendSMS(userId, smsContent);

    return response;
  } catch (error) {
    console.error("Error creating prescription and sending SMS:", error);
    throw error;
  }
};


export async function getDoctorDetails(doctorId: string) {
  try {
    const doctor = await databases.getDocument(
      "672cd052000155a2740d",
      "672cd14e0035fd25da8a", doctorId);
    return {
      doctorName: doctor.name, // Adjust based on your collection's field names
    };
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    throw error;
  }
}

// Fetch all patients
export async function getAllPatients() {
  try {
    const patients = await databases.listDocuments(
      "672cd052000155a2740d", 
      "672cd0d0001fddb6fe4c");
    return patients.documents.map((patient) => ({
      userId: patient.$id,
      name: patient.name, // Adjust based on your collection's field names
    }));
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};



export const getPrescriptions = async (userId: string) => {
  try {
    // Step 1: Fetch the patient details using userId
    const patients = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your database ID
      "672cd0d0001fddb6fe4c", // Replace with your patient collection ID
      [Query.equal("userId", [userId])]
    );

    if (!patients.documents.length) {
      throw new Error("Patient not found");
    }

    const patient = patients.documents[0];
    const patientName = patient.name;

    // Step 2: Fetch prescriptions by matching patientName
    const prescriptions = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your database ID
      "677f931f001d0746bbb0", // Replace with your prescription collection ID
      [Query.equal("patientName", [patientName])]
    );

    return prescriptions.documents.map((doc) => parseStringify(doc)); // Return the parsed prescriptions
  } catch (error) {
    console.error(
      "An error occurred while retrieving the prescriptions:",
      error
    );
    return [];
  }
};
