import Link from "next/link";
import { databases } from "@/lib/appwrite.config";
import { Query } from "node-appwrite";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Appointment {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  patientName: string;
  schedule?: string;
  reason?: string;
}

const databaseId = "672cd052000155a2740d";
const appointmentsCollectionId = "672cd19f002c39f237ee";
const doctorsCollectionId = "672cd14e0035fd25da8a";
const patientsCollectionId = "672cd0d0001fddb6fe4c";

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

// Function to update appointments with doctor IDs
const updateAppointmentsWithDoctorId = async () => {
  try {
    // Fetch doctors and create a name-to-ID mapping
    const doctorMap = await fetchDoctors();

    // Fetch all appointments
    const appointmentsResponse = await databases.listDocuments(databaseId, appointmentsCollectionId);
    const appointments = appointmentsResponse.documents;

    // Update appointments where the doctor field is missing
    for (const appointment of appointments) {
      if (!appointment.doctor && appointment.primaryPhysician) {
        //@ts-ignore
        const doctorId = doctorMap[appointment.primaryPhysician];
        if (doctorId) {
          // Update the appointment with the doctor ID
          await databases.updateDocument(
            databaseId,
            appointmentsCollectionId,
            appointment.$id,
            { doctor: doctorId }
          );
          
        }
      }
    }
  } catch (error) {
    console.error("Error updating appointments with doctor IDs:", error);
  }
};

// Fetch appointments for a specific doctor
const getDoctorAppointments = async (doctorId: string): Promise<Appointment[]>=> {
  
  try {
    console.log("Fetching appointments for doctor ID:", doctorId);

    const appointmentsResponse = await databases.listDocuments(
      databaseId,
      appointmentsCollectionId,
      [
        Query.equal("doctor", doctorId), // Filter by doctor's ID
        Query.orderAsc("schedule"), // Order by schedule ascending
      ]
    );

    // Fetch all patients to map userId to names
    const patientMap = await fetchPatients();

    // Replace userId with patientName in appointments
    const appointments = appointmentsResponse.documents.map((appointment) => ({
      ...appointment,
      //@ts-ignore
      patientName: patientMap[appointment.userId] || "Unknown", // Use patientName if available, otherwise "Unknown"
    }));

    console.log("Fetched appointments:", appointments);
    return appointments;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return [];
  }
};



const ViewAllAppointments = async (props: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await props.params;
  const appointments = await getDoctorAppointments(doctorId);

  return (
    <div className="min-h-screen bg-[#CC2B5E]">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">All Appointments</h1>
          <p className="text-gray-100 mt-2">
            Manage all your scheduled appointments in one place.
          </p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-[#AF1740] mb-4">Appointments</h2>
          {appointments.length > 0 ? (
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-[#DE7C7D] text-white">
                  <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Reason/Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.$id}
                    className="hover:bg-[#FCD2CF] transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.patientName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.schedule
                        ? formatDateTime(appointment.schedule).dateTime
                        : "No Schedule"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {appointment.reason || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700">No appointments scheduled.</p>
          )}
        </div>
        <br></br>
        <br></br>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/doctor/${doctorId}/dashboard`}>
            Go To Dashboard
          </Link>
        </Button>
        </div>
        
      
    </div>
  );
};

export default ViewAllAppointments;
