"use client"

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite.config";
import { formatDateTime } from "@/lib/utils";
import { Query } from "node-appwrite";

const databaseId = "672cd052000155a2740d";
const feedbackCollectionId = "6797749f00030c697f81"; // Replace with actual feedback collection ID

interface Feedback {
  patientName: string;
  feedback: string;
}

interface FeedbackPageProps {
  params: {
    doctorId: string;
  };
}

const DoctorFeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          feedbackCollectionId,
          [Query.orderAsc("$createdAt")] // Optionally order by feedback creation date
        );
        //@ts-ignore
        setFeedbackList(response.documents);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-900 via-pink-800 to-pink-900 p-10">
      <main className="flex-1 p-10 bg-white shadow-2xl rounded-3xl max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Patient Feedback</h1>
          <p className="text-gray-600 mt-2">Insights and feedback from patients</p>
        </header>

        {/* Feedback List */}
        <section className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading feedback...</p>
          ) : feedbackList.length === 0 ? (
            <p className="text-center text-gray-500">No feedback available.</p>
          ) : (
            feedbackList.map((feedbackItem, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-700 to-green-700 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold border-b pb-2 mb-2">{feedbackItem.patientName}</h3>
                <p className="mt-2 text-sm leading-relaxed">{feedbackItem.feedback}</p>
              </div>
            ))
          )}
        </section>  
      </main>
    </div>
  );
};

export default DoctorFeedbackPage;
