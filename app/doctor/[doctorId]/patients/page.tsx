import { databases } from "@/lib/appwrite.config";
import { Query } from "node-appwrite";

interface Patient {
  id: string;
  name: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
}

const databaseId = "672cd052000155a2740d";
const doctorsCollectionId = "672cd14e0035fd25da8a";
const patientsCollectionId = "672cd0d0001fddb6fe4c";

// Function to fetch the doctor's name using their ID
const fetchDoctorNameById = async (doctorId: string): Promise<string | null> => {
  try {
    const doctorResponse = await databases.getDocument(databaseId, doctorsCollectionId, doctorId);
    //@ts-ignore
    return doctorResponse.name || null; // Assuming `name` is the doctor's name field
  } catch (error) {
    console.error("Error fetching doctor name by ID:", error);
    return null;
  }
};

// Function to fetch patients for a specific doctor and include detailed attributes
const fetchPatientsWithDetailsByDoctor = async (doctorId: string) => {
  try {
    // Get the doctor's name from their ID
    const doctorName = await fetchDoctorNameById(doctorId);
    if (!doctorName) {
      console.error(`Doctor with ID ${doctorId} not found.`);
      return [];
    }

    // Fetch patients where the primaryPhysician matches the doctor's name
    const patientsResponse = await databases.listDocuments(
      databaseId,
      patientsCollectionId,
      [Query.equal("primaryPhysician", doctorName)] // Filter by the doctor's name
    );

    // Map patients with detailed attributes
    const patients = patientsResponse.documents.map((patient) => ({
      id: patient.$id,
      name: patient.name || "Unknown", // Assuming `name` field exists
      insuranceProvider: patient.insuranceProvider || "N/A",
      insurancePolicyNumber: patient.insurancePolicyNumber || "N/A",
      allergies: patient.allergies || "N/A",
      currentMedication: patient.currentMedication || "N/A",
      familyMedicalHistory: patient.familyMedicalHistory || "N/A",
      pastMedicalHistory: patient.pastMedicalHistory || "N/A",
    }));

    console.log(`Fetched patients for doctor ${doctorName}:`, patients);
    return patients;
  } catch (error) {
    console.error("Error fetching patients with details by doctor:", error);
    return [];
  }
};

// Example: Fetch and display patients with detailed attributes for a specific doctor
const ViewPatientsWithDetails = async (props: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await props.params;
  // Fetch patients with detailed attributes
  const patients = await fetchPatientsWithDetailsByDoctor(doctorId);

  return (
    <div className="min-h-screen bg-[#CC2B5E]">
  <div className="container mx-auto p-6">
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white">
        Patient's Detailed Information
      </h1>
      <p className="text-gray-100 mt-2">
        View all patients associated with the doctor and their detailed information.
      </p>
    </header>

    {/* Patient List */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#AF1740] mb-4">Patients</h2>
      {patients.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#DE7C7D] text-white">
              <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Insurance Provider</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Insurance Policy Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Allergies</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Current Medication</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Family Medical History</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Past Medical History</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-[#FCD2CF] transition-colors">
                <td className="border border-gray-300 px-4 py-2">{patient.name}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.insuranceProvider}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.insurancePolicyNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.allergies}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.currentMedication}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.familyMedicalHistory}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.pastMedicalHistory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No patients found for the selected doctor.</p>
      )}
    </div>
  </div>
</div>
  )}
export default ViewPatientsWithDetails;
