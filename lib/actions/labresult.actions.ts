import { Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const getLabresults = async (userId: string) => {
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
      "67967708003e696907da", // Replace with your prescription collection ID
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