"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

type LabTest = {
  id: string;
  patient: string;
  userid: string;
  primaryPhysician: string;
  testCategory: string;
  specifiedTest: string;
  sampleCollectionMethod: string;
};

type LabTestResultData = {
  labTestId: string;
  result: string;
  notes: string;
};

export default function LabTestResultForm() {
  const { register, handleSubmit, reset, watch } = useForm<LabTestResultData>();
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch lab tests for the doctor
  useEffect(() => {
    // Replace with actual API fetch logic
    async function fetchLabTests() {
      const data: LabTest[] = [
        {
          id: "1",
          patient: "John Green",
          userid: "6734...",
          primaryPhysician: "Dr. Smith",
          testCategory: "Blood Test",
          specifiedTest: "Glucose",
          sampleCollectionMethod: "At Clinic",
        },
        // Add more sample data as needed
      ];
      setLabTests(data);
    }

    fetchLabTests();
  }, []);

  const handleSelectLabTest = (labTestId: string) => {
    setSelectedLabTest(labTestId);
    reset(); // Clear form for new test entry
  };

  const onSubmit = async (data: LabTestResultData) => {
    try {
      console.log("Submitting result:", data);
      // Replace with API call to save result
      setSuccessMessage("Lab test result submitted successfully!");
    } catch (error) {
      console.error("Error submitting lab test result:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lab Test Result Form</h1>

      {/* Lab Tests Table */}
      {labTests.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold">Select a Lab Test:</h3>
          <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Patient</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Test</th>
                <th className="border border-gray-300 px-4 py-2">Collection Method</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {labTests.map((test) => (
                <tr key={test.id}>
                  <td className="border border-gray-300 px-4 py-2">{test.patient}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.testCategory}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.specifiedTest}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.sampleCollectionMethod}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleSelectLabTest(test.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No lab tests available.</p>
      )}

      {/* Result Form */}
      {selectedLabTest && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="hidden"
            value={selectedLabTest}
            {...register("labTestId")}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="result" className="font-medium">
              Test Result
            </label>
            <textarea
              id="result"
              {...register("result", { required: true })}
              className="border rounded-md px-4 py-2"
              placeholder="Enter the test result here..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="font-medium">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              className="border rounded-md px-4 py-2"
              placeholder="Add any additional notes here..."
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Result
          </button>
        </form>
      )}

      {/* Success Message */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
}
