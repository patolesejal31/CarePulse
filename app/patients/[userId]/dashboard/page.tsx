
import { getUser } from "@/lib/actions/patient.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import { databases } from "@/lib/appwrite.config";
import { formatDateTime } from "@/lib/utils";
import { Query } from "node-appwrite";
import Link from "next/link";
import { FeedbackForm } from "@/components/forms/Feedbackform";
import LogoutButton from "@/components/ui/LogOutButton";




const getAppointments = async (userId: string) => {
  try {
    const response = await databases.listDocuments("672cd052000155a2740d", "672cd19f002c39f237ee", [
      Query.equal("userId", userId),
      Query.orderAsc("schedule"), // Order by date ascending
    ]);

    return response.documents;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

const getLabTestRequests = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your actual database ID
      "67697870002962f96467", // Replace with your lab test collection ID
      [
        Query.equal("userId", userId),
        Query.orderDesc("sampleCollectionDate"), // Order by most recent request
      ]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching lab test requests:", error);
    return [];
  }
};
const getPatientName = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your actual database ID
      "672cd0d0001fddb6fe4c", // Replace with your patient collection ID
      [Query.equal("userId", userId)]
    );

    if (response.documents.length > 0) {
      return response.documents[0].name; // Assuming the patientName field exists
    } else {
      throw new Error("No patient found with the provided userId.");
    }
  } catch (error) {
    console.error("Error fetching patient name:", error);
    return null;
  }
};

const getLabResults = async (userId: string) => {
  try {
    // Fetch the patient name using the userId
    const patientName = await getPatientName(userId);
    if (!patientName) {
      throw new Error("Patient name could not be retrieved.");
    }

    // Use the patient name to query the labResults collection
    const response = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your actual database ID
      "67967708003e696907da", // Replace with your lab results collection ID
      [Query.equal("patientName", patientName)] // Query by patientName
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching lab results:", error);
    return [];
  }
};



import { DashboardContent } from "@/components/DashboardContent";

const PatientDashboard = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  const user = await getUser(userId);
  const patient = await getPatient(userId);
  const appointments = await getAppointments(userId);
  const labTestRequests = await getLabTestRequests(userId);
  const labResults = await getLabResults(userId);
  
  if (!patient) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#740938]">
        <p className="text-white font-bold text-2xl animate-pulse">Patient record not found!</p>
      </div>
    );
  }

  return (
    <DashboardContent
      userId={userId}
      patient={patient}
      appointments={appointments}
      labTestRequests={labTestRequests}
      labResults={labResults}
    />
  );
};

export default PatientDashboard;

