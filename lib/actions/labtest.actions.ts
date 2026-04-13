"use server"
//import { sendSMSNotification } from "@/lib/notifications"; // Assuming you have a method for sending SMS
import { revalidatePath } from "next/cache"; // If using revalidation in Next.js

import { formatDateTime, parseStringify } from "../utils";
import { DATABASE_ID, databases, LABTEST_COLLECTION_ID, } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { sendSMSNotification } from "./appointment.actions";

export const createLabTest = async (labTestData: CreateLabTestParams) => {
  try {
    const newLabTest = await databases.createDocument(
      DATABASE_ID!,
      LABTEST_COLLECTION_ID!,
      ID.unique(),
      labTestData
    );

    // Revalidate paths (if necessary, for cache revalidation)
    revalidatePath("/admin");
    return parseStringify(newLabTest); // Ensure you have a method to safely parse/serialize the response
  } catch (error) {
    console.error("An error occurred while creating a new lab test:", error);
  }
};

export const updateLabTest = async ({
  labTestId,
  userId,
  labTest,
  type,
}: UpdateLabTestParams) => {
  try {
    // Update lab test document
    const updatedLabTest = await databases.updateDocument(
      DATABASE_ID!,
      LABTEST_COLLECTION_ID!,
      labTestId,
      labTest
    );

    if (!updatedLabTest) throw new Error("Failed to update lab test");

    // Send notification based on the lab test type
    const smsMessage = `Greetings from CarePulse. ${
      type === "create"
        ? `Your lab test has been scheduled for ${formatDateTime(labTest.sampleCollectionDateTime!).dateTime}.`
        : `We regret to inform you that your lab test scheduled for ${formatDateTime(labTest.sampleCollectionDateTime!).dateTime} has been cancelled. Reason: ${labTest.cancellationReason}.`
    }`;

    await sendSMSNotification(userId, smsMessage); // Send an SMS notification

    revalidatePath("/admin"); // Revalidate the admin page (if necessary)
    return parseStringify(updatedLabTest); // Return the updated lab test document
  } catch (error) {
    console.error("An error occurred while updating a lab test:", error);
  }
};
export const getLabTestRequest = async (newLabTestId: string) => {
  try {
    const labTestRequest = await databases.getDocument(
      "672cd052000155a2740d",
      "67697870002962f96467", // Replace with the actual Lab Test collection ID
      newLabTestId
    );

    return parseStringify(labTestRequest);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the lab test request:",
      error
    );
  }
};

const PATIENTS_COLLECTION_ID = "672cd0d0001fddb6fe4c"; // Replace with your actual Patients Collection ID
const LAB_REQUESTS_COLLECTION_ID = "67697870002962f96467"; // Replace with your actual Lab Requests Collection ID


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

// Fetch lab requests for a specific patient
export const getAllLabRequests = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      "672cd052000155a2740d", 
      "67697870002962f96467",
       [
      Query.equal("userId", userId), // Query to filter by userId
    ]);

    const labRequests = response.documents.map((doc) => ({
      id: doc.$id,
      testCategory: doc.testCategory, // Replace with the actual field name for test name
      status: doc.status, // Replace with the actual field name for the status of the lab request
      requestedAt: doc.requestedAt, // Replace with your date or timestamp field
    }));

    return labRequests;
  } catch (error) {
    console.error("Error fetching lab requests:", error);
    throw new Error("Failed to fetch lab requests.");
  }
};
export async function getDoctorById(doctorId:string) {
  try {
    const response = await databases.getDocument(
      '672cd052000155a2740d', // Replace with your Appwrite database ID
      '672cd14e0035fd25da8a', // Replace with your doctors collection ID
      doctorId
    );

    return { id: response.$id, name: response.name }; // Assuming the doctor document has a "name" field
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    throw new Error('Failed to fetch doctor details');
  }
}


export async function getLabRequestsByDoctorName(doctorName:string) {
  try {
    const response = await databases.listDocuments(
      '672cd052000155a2740d', // Replace with your Appwrite database ID
      '67697870002962f96467', // Replace with your lab requests collection ID
      [
        Query.equal('primaryPhysician', doctorName) // Assuming "doctorName" is a field in the lab request documents
      ]
    );

    return response.documents.map((doc) => ({
      testCategory: doc.testCategory, // Assuming "testName" is a field in the lab request documents
    }));
  } catch (error) {
    console.error('Error fetching lab requests by doctor name:', error);
    throw new Error('Failed to fetch lab requests');
  }
}
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
export async function getLabTestByPhysicianAndPatient(
  primaryPhysician: string,
  userId: string
) {
  try {
    // Database and Collection IDs
    const databaseId = "672cd052000155a2740d"; // Replace with your database ID
    const labTestsCollectionId = "67697870002962f96467"; // Replace with your lab tests collection ID

    // Query to fetch matching lab tests
    const response = await databases.listDocuments(
      databaseId,
      labTestsCollectionId,
      [
        `equal("primaryPhysician", "${primaryPhysician}")`,
        `equal("patientName", "${userId}")`,
      ]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching lab tests:", error);
    return [];
  }
}
// Fetch lab tests by doctor name
export const getLabTestsByPhysician = async (primaryPhysician: string) => {
  try {
    const response = await databases.listDocuments(
      "LAB_DATABASE_ID", // Replace with actual database ID
      "LABTEST_COLLECTION_ID", // Replace with actual collection ID
      [Query.equal("primaryPhysician", primaryPhysician)] // Filter by doctor
    );
    return response.documents.map((doc) => ({
      id: doc.$id,
      patient: doc.patient,
      testCategory: doc.testCategory,
      specifiedTest: doc.specifiedTest,
    }));
  } catch (error) {
    console.error("Error fetching lab tests:", error);
    return [];
  }
};

// Update lab test result
export const updateLabTestResult = async (id: string, result: string) => {
  try {
    await databases.updateDocument(
      "LAB_DATABASE_ID", // Replace with actual database ID
      "LABTEST_COLLECTION_ID", // Replace with actual collection ID
      id,
      { result } // Update with the new result field
    );
  } catch (error) {
    console.error("Error updating lab test result:", error);
  }
};
