import { databases } from "@/lib/appwrite.config";
import { Query } from "node-appwrite";
import { formatDateTime } from "@/lib/utils";

interface LabTestRequest {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  patientName: string;
  testName?: string; // Include this if the field is optional
  schedule?: string; // Include this if the field is optional
  status?: string;
}

const databaseId = "672cd052000155a2740d"; // Replace with your database ID
const labTestRequestsCollectionId = "672cd19f002c39f237ef"; // Replace with your lab test requests collection ID
const doctorsCollectionId = "672cd14e0035fd25da8a"; // Replace with your doctors collection ID
const patientsCollectionId = "672cd0d0001fddb6fe4c"; // Replace with your patients collection ID

// Function to fetch all doctors
const fetchDoctors = async () => {
  try {
    const response = await databases.listDocuments(databaseId, doctorsCollectionId);
    return response.documents.reduce((acc, doctor) => {
      // Map doctor name to their ID
      //@ts-ignore
      acc[doctor.name] = doctor.$id;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return {};
  }
};

// Function to fetch all patients
const fetchPatients = async () => {
  try {
    const response = await databases.listDocuments(databaseId, patientsCollectionId);
    return response.documents.reduce((acc, patient) => {
      // Map userId to patient name
      //@ts-ignore
      acc[patient.userId] = patient.name; 
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {};
  }
};

// Function to update lab test requests with doctor IDs
const updateLabTestRequestsWithDoctorId = async () => {
  try {
    // Fetch doctors and create a name-to-ID mapping
    const doctorMap = await fetchDoctors();

    // Fetch all lab test requests
    const labTestRequestsResponse = await databases.listDocuments(databaseId, labTestRequestsCollectionId);
    const labTestRequests = labTestRequestsResponse.documents;

    // Update lab test requests where the doctor field is missing
    for (const request of labTestRequests) {
      if (!request.doctor && request.assignedPhysician) {
        //@ts-ignore
        const doctorId = doctorMap[request.assignedPhysician];
        if (doctorId) {
          // Update the lab test request with the doctor ID
          await databases.updateDocument(
            databaseId,
            labTestRequestsCollectionId,
            request.$id,
            { doctor: doctorId }
          );
          console.log(`Updated lab test request ${request.$id} with doctor ID ${doctorId}`);
        }
      }
    }
  } catch (error) {
    console.error("Error updating lab test requests with doctor IDs:", error);
  }
};

// Fetch lab test requests for a specific doctor
const getDoctorLabTestRequests = async (doctorId: string): Promise<LabTestRequest[]> => {
  try {
    console.log("Fetching lab test requests for doctor ID:", doctorId);

    const labTestRequestsResponse = await databases.listDocuments(
      databaseId,
      labTestRequestsCollectionId,
      [
        Query.equal("doctor", doctorId), // Filter by doctor's ID
        Query.orderAsc("schedule"), // Order by schedule ascending
      ]
    );

    // Fetch all patients to map userId to names
    const patientMap = await fetchPatients();

    // Replace userId with patientName in lab test requests
    const labTestRequests = labTestRequestsResponse.documents.map((request) => ({
      ...request,
      //@ts-ignore
      patientName: patientMap[request.userId] || "Unknown", // Use patientName if available, otherwise "Unknown"
    }));

    console.log("Fetched lab test requests:", labTestRequests);
    return labTestRequests;
  } catch (error) {
    console.error("Error fetching lab test requests:", error);
    return [];
  }
};

const ViewAllLabTestRequests = async ({ params: { doctorId } }: SearchParamProps) => {
  // Ensure lab test requests are updated with doctor IDs
  await updateLabTestRequestsWithDoctorId();

  // Fetch all lab test requests for the doctor
  const labTestRequests = await getDoctorLabTestRequests(doctorId);

  return (
    <div className="min-h-screen bg-[#E8F1FC]">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C73E8]">All Lab Test Requests</h1>
          <p className="text-gray-700 mt-2">Manage all your lab test requests in one place.</p>
        </header>

        {/* Lab Test Requests List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Lab Test Requests</h2>
          {labTestRequests.length > 0 ? (
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Test Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {labTestRequests.map((request) => (
                  <tr key={request.$id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {request.patientName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.testName || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.schedule ? formatDateTime(request.schedule).dateTime : "No Schedule"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.status || "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700">No lab test requests available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllLabTestRequests;
