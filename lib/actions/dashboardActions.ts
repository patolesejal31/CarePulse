import { databases, messaging } from "@/lib/appwrite.config";
import { Query, ID } from "node-appwrite";

export const getAppointmentStats = async () => {
  const appointments = await databases.listDocuments("DATABASE_ID", "APPOINTMENT_COLLECTION_ID");

  const initialCounts = {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  };

  const counts = appointments.documents.reduce((acc, appointment) => {
    switch (appointment.status) {
      case "scheduled":
        acc.scheduledCount++;
        break;
      case "pending":
        acc.pendingCount++;
        break;
      case "cancelled":
        acc.cancelledCount++;
        break;
    }
    return acc;
  }, initialCounts);

  return { ...counts, total: appointments.total };
};

export const fetchAppointments = async () => {
  return await databases.listDocuments("DATABASE_ID", "APPOINTMENT_COLLECTION_ID", [
    Query.orderDesc("$createdAt"),
  ]);
};

export const sendSMS = async (userId: string, content: string) => {
  try {
    await messaging.createSms(ID.unique(), content, [], [userId]);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};
