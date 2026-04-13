"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { databases } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LabTest = {
  $id: string;
  userId: string;
  testCategory: string;
  specifiedTest: string;
  sampleCollectionMethod: string;
};

type LabTestWithPatient = LabTest & {
  patientName: string;
};

type Patient = {
  $id: string;
  userId: string;
  name: string;
};

type LabTestResultData = {
  labTestId: string;
  parameters: { name: string; value: string; unit: string; reference: string }[];
  notes: string;
};

export default function LabTestResultForm() {
  const { register, handleSubmit, reset, control } = useForm<LabTestResultData>({
    defaultValues: {
      parameters: [{ name: "", value: "", unit: "", reference: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parameters",
  });

  const [labTests, setLabTests] = useState<LabTestWithPatient[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    async function fetchLabTests() {
      try {
        const labTestResponse = await databases.listDocuments("672cd052000155a2740d", "67697870002962f96467");
        //@ts-ignore
        const labTests: LabTest[] = labTestResponse.documents;

        const patientResponse = await databases.listDocuments("672cd052000155a2740d", "672cd0d0001fddb6fe4c");
        //@ts-ignore
        const patients: Patient[] = patientResponse.documents;

        const labResultsResponse = await databases.listDocuments("672cd052000155a2740d", "67967708003e696907da");
        //@ts-ignore
        const labResults = labResultsResponse.documents;

        // Map patients to their names using their userId
        const patientMap = new Map(patients.map((p) => [p.userId, p.name]));

        // Create a map of existing lab results based on patientName, testCategory, and specifiedTest
        const existingResultsMap = new Map(
          labResults.map((result) => {
            const key = `${result.patientName}|${result.testCategory}|${result.specifiedTest}`;
            return [key, result];
          })
        );

        // Map lab tests to include patient names and status
        const labTestsWithPatients = labTests.map((test) => {
          const patientName = patientMap.get(test.userId) || "Unknown Patient";
          const resultKey = `${patientName}|${test.testCategory}|${test.specifiedTest}`;

          return {
            ...test,
            patientName,
            isDone: existingResultsMap.has(resultKey), // Check if result exists for this test
          };
        });

        setLabTests(labTestsWithPatients);
      } catch (error) {
        console.error("Error fetching lab tests, patients, or lab results:", error);
      }
    }

    fetchLabTests();
  }, []);

  const handleSelectLabTest = (labTestId: string) => {
    setSelectedLabTest(labTestId);
    reset();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLabTest(null);
  };

  const onSubmit = async (data: LabTestResultData) => {
    if (!selectedLabTest) {
      console.error("No lab test selected!");
      return;
    }

    // Check if at least one parameter is filled
    const hasValidParameter = data.parameters.some(
      (param) =>
        param.name.trim() !== "" ||
        param.value.trim() !== "" ||
        param.unit.trim() !== "" ||
        param.reference.trim() !== ""
    );

    if (!hasValidParameter) {
      setAlertMessage("Please fill at least one parameter before submitting.");
      setAlertType("error");
      setShowAlert(true);
      // Hide the alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    try {
      // Find the selected lab test details
      const selectedLabTestDetails = labTests.find(
        (test) => test.$id === selectedLabTest
      );

      if (!selectedLabTestDetails) {
        console.error("Selected lab test not found!");
        return;
      }

      // Prepare the document data
      const documentData: Record<string, any> = {
        labTestId: selectedLabTest, // ID of the lab test
        patientName: selectedLabTestDetails.patientName, // Patient's name
        testCategory: selectedLabTestDetails.testCategory, // Category of the test
        specifiedTest: selectedLabTestDetails.specifiedTest, // Specific test name
        notes: data.notes || "", // Notes (optional)
      };

      // Flatten the parameters into separate attributes
      data.parameters.forEach((param, index) => {
        documentData[`parameterName_${index + 1}`] = param.name;
        documentData[`value_${index + 1}`] = param.value;
        documentData[`unit_${index + 1}`] = param.unit;
        documentData[`reference_${index + 1}`] = param.reference;
      });

      // Save to the database
      const databaseId = "672cd052000155a2740d"; // Replace with your actual database ID
      const collectionId = "67967708003e696907da"; // Replace with your actual collection ID

      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(), // Generate a unique document ID
        documentData // Pass the prepared data object
      );

      setAlertMessage("Lab test result submitted successfully!");
      setAlertType("success");
      setShowAlert(true);
      closeModal();
    } catch (error) {
      console.error("Error submitting lab test result:", error);
      setAlertMessage("Failed to submit lab test result. Please try again.");
      setAlertType("error");
      setShowAlert(true);
    }

    // Hide the alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Lab Test Result</h1>

      {labTests.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-[#AF1740] mb-4">Select a Lab Test:</h3>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#DE7C7D] text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Patient</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Test</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Collection Method</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {labTests.map((test) => (
                <tr key={test.$id} className="hover:bg-[#FCD2CF] transition-colors">
                  <td className="border border-gray-300 px-4 py-2">{test.patientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.testCategory}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.specifiedTest}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.sampleCollectionMethod}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {//@ts-ignore
                    test.isDone ? (
                      <span className="text-green-500">Completed</span>
                    ) : (
                      <button
                        onClick={() => handleSelectLabTest(test.$id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Select
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No lab tests available.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Add Lab Test Result</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="hidden"
                //@ts-ignore
                value={selectedLabTest}
                {...register("labTestId")}
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="parameters" className="font-medium">
                  Test Parameters
                </label>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-center">
                      <input
                        {...register(`parameters.${index}.name`)}
                        className="border rounded-md px-2 py-1 w-1/4"
                        placeholder="Name"
                      />
                      <input
                        {...register(`parameters.${index}.value`)}
                        className="border rounded-md px-2 py-1 w-1/4"
                        placeholder="Value"
                      />
                      <input
                        {...register(`parameters.${index}.unit`)}
                        className="border rounded-md px-2 py-1 w-1/4"
                        placeholder="Unit"
                      />
                      <input
                        {...register(`parameters.${index}.reference`)}
                        className="border rounded-md px-2 py-1 w-1/4"
                        placeholder="Reference"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append({ name: "", value: "", unit: "", reference: "" })}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Add Parameter
                  </button>
                </div>
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

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAlert && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-${
            alertType === "success" ? "green" : "red"
          }-500 text-white p-4 rounded-lg shadow-lg`}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
}
