// LabResultView.tsx (React component for displaying lab results)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { databases } from '@/lib/appwrite.config';

 const LabResultView = () => {
  const [labResults, setLabResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userId, labTestId } = router.query; // Get userId and labTestId from URL params

  useEffect(() => {
    if (!userId || !labTestId) return;

    // Fetch lab result data
    const fetchLabResults = async () => {
      try {
        const response = await databases.getDocument(
          'patients', // Database ID (you may need to adjust it based on your setup)
          'LabResults', // Collection ID (ensure this matches your collection ID)
          labTestId as string // The document ID of the specific lab test
        );
        setLabResults(response);
      } catch (error) {
        setError('Failed to fetch lab results');
        console.error(error);
      }
    };

    fetchLabResults();
  }, [userId, labTestId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!labResults) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lab Test Result</h1>
      <p><strong>Test ID:</strong> {labResults.$id}</p>
      <p><strong>Test Name:</strong> {labResults.testName}</p>
      <p><strong>Result:</strong> {labResults.result}</p>
      <p><strong>Date:</strong> {labResults.testDate}</p>
      {/* Add more fields as per your database schema */}
    </div>
  );
};

export default LabResultView;
