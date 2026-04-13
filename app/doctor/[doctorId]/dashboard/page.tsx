import { getDoctor } from "@/lib/actions/doctor.actions";
import { databases } from "@/lib/appwrite.config";
import { formatDateTime } from "@/lib/utils";
import { Query } from "node-appwrite";
import Image from "next/image";
import LogoutButton from "@/components/ui/LogOutButton";

const databaseId = "672cd052000155a2740d";
const labTestsCollectionId = "67697870002962f96467";

const getDoctorAppointments = async (doctorName:string) => {
  try {
    const response = await databases.listDocuments(databaseId, "672cd19f002c39f237ee", [
      Query.equal("primaryPhysician", doctorName),
      Query.orderAsc("schedule"),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return [];
  }
};

const getDoctorLabRequests = async (doctorName:string) => {
  try {
    const response = await databases.listDocuments(databaseId, labTestsCollectionId, [
      Query.equal("primaryPhysician", doctorName),
      Query.orderAsc("sampleCollectionDate"),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Error fetching lab test requests:", error);
    return [];
  }
};

const DoctorDashboard = async (props: {
  params: Promise<{ doctorId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await props.params;
  const { doctorId } = params;
  const doctor = await getDoctor(doctorId);

  if (!doctor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">Doctor record not found!</p>
      </div>
    );
  }

  const appointments = await getDoctorAppointments(doctor.name);
  const labRequests = await getDoctorLabRequests(doctor.name);
  const doctorImage = `/assets/images/${doctor.name.toLowerCase().replace(/\s+/g, "_")}.png`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar: Actions */}
      <aside className="w-1/5 p-6 bg-pink-900 text-white shadow-lg">
      <div>
        <h2 className="text-xl font-bold mb-6">Actions</h2>
        <nav className="space-y-4">
          {["appointments", "patients", "lab-requests", "prescriptions", "feedback"].map((item) => (
            <a
              key={item}
              href={`/doctor/${doctorId}/${item}`}
              className="block w-full text-center bg-pink-700 py-2 px-4 rounded-lg shadow hover:bg-blue-600"
            >
              {item.replace("-", " ").toUpperCase()}
            </a>
          ))}
        </nav>
        </div>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>
    

      {/* Main Content: Doctor Dashboard */}
      <main className="flex-1 p-8">
        <header className="flex items-center bg-white p-6 rounded-lg shadow mb-6">
          <Image
            src={doctorImage}
            alt={doctor.name}
            width={80}
            height={80}
            className="rounded-full border border-gray-300 shadow-lg"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-blue-900">Dr. {doctor.name}</h1>
            <p className="text-gray-700">Specialist in {doctor.specialization}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scheduled Appointments */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Scheduled Appointments</h2>
            <ul className="space-y-2">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <li key={appointment.$id} className="text-gray-800">
                    📅 {formatDateTime(appointment.schedule).dateTime}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No appointments scheduled.</p>
              )}
            </ul>
          </section>

          {/* Lab Test Requests */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Lab Test Requests</h2>
            <ul className="space-y-2">
              {labRequests.length > 0 ? (
                labRequests.map((request) => (
                  <li key={request.$id} className="text-gray-800">
                    🧪 {request.testCategory} - {request.specifiedTest} ({formatDateTime(request.sampleCollectionDate).dateTime})
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No lab test requests found.</p>
              )}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
