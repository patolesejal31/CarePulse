"use client"
import { useState, useEffect } from "react";
import { getUser } from "@/lib/actions/patient.actions"; // Ensure getUser function is working properly
import { databases } from "@/lib/appwrite.config";
import Alert from "../Alert/alert";


interface FeedbackFormProps {
  userId: string;
}

export const FeedbackForm = ({ userId }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Fetch the patient's name based on userId
    const fetchPatientName = async () => {
      try {
        const user = await getUser(userId); // Fetch user details using userId
        setPatientName(user.name); // Assuming getUser returns user details including name
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchPatientName();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setAlertMessage("Please provide feedback before submitting.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      const data = {
        patientName, // Patient's name
        feedback,    // User's feedback
      };

      // Create a new feedback document in the feedback collection
      await databases.createDocument(
        "672cd052000155a2740d", // Database ID
        "6797749f00030c697f81", // Replace with your actual feedback collection ID
        "unique()",             // You can use unique() to generate an auto-generated document ID
        data
      );

      setAlertMessage("Feedback submitted successfully!");
      setShowAlert(true);
      setFeedback(""); // Reset feedback form after successful submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setAlertMessage("There was an issue submitting your feedback. Please try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#AF1740]"
        />

        <button
          type="submit"
          disabled={loading || !patientName} // Disable if patientName is missing
          className={`w-full py-2 px-4 rounded-lg text-white ${
            loading || !patientName
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#AF1740] hover:bg-[#CC2B52]"
          }`}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      {/* Show the alert */}
      <Alert message={alertMessage} showAlert={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
};
