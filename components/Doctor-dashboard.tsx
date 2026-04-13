"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Databases } from "node-appwrite";
import Link from "next/link";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("6717ba3f003448972ea1"); // Your Appwrite project ID

const databases = new Databases(client);

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState<{ name: string; specialization: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Replace with authenticated doctor's ID
        const doctorId = "AUTHENTICATED_DOCTOR_ID"; // Replace with real logic for fetching authenticated doctor's ID.

        const response = await databases.getDocument(
          "672cd052000155a2740d", // Replace with your database ID
          "672cd14e0035fd25da8a", // Replace with your collection ID
          doctorId
        );

        setDoctor({
          name: response.name,
          specialization: response.specialization,
        });
      } catch (error: any) {
        console.error("Failed to fetch doctor data:", error.message);
        setErrorMessage("Failed to load doctor data. Please try again later.");
      }
    };

    fetchDoctorData();
  }, []);

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Dr. {doctor.name}</h1>
        <p className="text-lg text-gray-600">Specialization: {doctor.specialization}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/doctors/appointments">
          <div className="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            <h2 className="text-lg font-semibold">View Appointments</h2>
            <p>Manage and track your appointments.</p>
          </div>
        </Link>

        <Link href="/doctors/prescriptions">
          <div className="p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            <h2 className="text-lg font-semibold">Manage Prescriptions</h2>
            <p>Create and track patient prescriptions.</p>
          </div>
        </Link>

        <Link href="/doctors/labtests">
          <div className="p-4 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600">
            <h2 className="text-lg font-semibold">Manage Lab Tests</h2>
            <p>Review and manage lab test results.</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default DoctorDashboard;
