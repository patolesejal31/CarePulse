import Image from "next/image";
import Link from "next/link";
import { Client, Databases, Account } from "node-appwrite";

const fetchPatientRecords = async () => {
  const client = new Client();
  const databases = new Databases(client);
  const account = new Account(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("6717ba3f003448972ea1"); // Replace with your project ID

  try {
    const user = await account.get(); // Fetch the currently logged-in user
    const userId = user.$id; // Extract user ID

    const response = await databases.listDocuments(
      "672cd052000155a2740d", // Replace with your database ID
      "672cd0d0001fddb6fe4c", // Replace with your collection ID
      [`equal("userId", "${userId}")`] // Filter documents by userId
    );

    if (response.documents.length > 0) {
      return response.documents[0]; // Return the first patient record
    } else {
      return null; // No records found for this user
    }
  } catch (error) {
    console.error("Error fetching patient records:", error);
    return null;
  }
};

const PatientRecordsPage = async () => {
  const patientRecord = await fetchPatientRecords();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-3">
             <Image
               src="/favicon.ico"
               height={32}
               width={32}
               alt="logo"
               className="h-8 w-fit"
             />
             <span className="text-xl font-bold text-white tracking-tight">CarePulse</span>
          </div>
        </Link>

        <p className="text-16-semibold">Patient Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Here are your medical records:
          </p>
        </section>

        <section className="p-4 bg-white rounded-lg shadow-md">
          {patientRecord ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
              <p className="text-gray-700">Name: {patientRecord.name}</p>
              <p className="text-gray-700">Email: {patientRecord.email}</p>
              <p className="text-gray-700">Phone: {patientRecord.phone}</p>
              <p className="text-gray-700">
                Medical History: {patientRecord.medicalHistory}
              </p>
            </div>
          ) : (
            <div>No records found for this user.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PatientRecordsPage;
