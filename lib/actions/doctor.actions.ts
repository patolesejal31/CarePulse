import { Databases, Query } from "node-appwrite";
import {  APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const getDoctorList = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.DOCTOR_COLLECTION_ID!
    );
    return response.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
    }));
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return [];
  }
};
export const getDoctor = async (doctorId: string) => {
  try {
    const doctor = await databases.getDocument(
      "672cd052000155a2740d",
      "672cd14e0035fd25da8a", 
       doctorId);
    return doctor;
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return null;
  }
}; 
export const getDoctorAppointment = async (primaryPhysician: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.equal("primaryPhysician", [primaryPhysician])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};




export const getDoctorAppointments = async (doctorId: string) => {
  try {
    const appointments = await databases.listDocuments(
      "672cd052000155a2740d", 
      "672cd19f002c39f237ee", 
      [
      Query.equal("doctorId", doctorId),
    ]);
    return appointments.documents;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};


export const getDoctorLabRequests = async (doctorId: string) => {
  try {
    const labRequests = await databases.listDocuments(
      "672cd052000155a2740d", 
      "67697870002962f96467", [
      Query.equal("doctorId", doctorId),
      Query.equal("status", "pending"), // Assuming a `status` field exists
    ]);
    return labRequests.documents;
  } catch (error) {
    console.error("Error fetching lab requests:", error);
    return [];
  }
};


export const submitFeedback = async (doctorId: string, feedback: string) => {
  try {
    const response = await databases.createDocument(
      "", 
      "feedback-collection-id", "unique()", {
      doctorId,
      feedback,
      timestamp: new Date().toISOString(),
    });
    return response;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

