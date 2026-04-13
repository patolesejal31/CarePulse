

import LabResultClient from "@/components/forms/labresultview";
import { getLabresults } from "@/lib/actions/labresult.actions";


const labresult = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  const labResults = await getLabresults(userId);

  if (!labResults || labResults.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600">No prescriptions found!</p>
      </div>
    );
  }
  
  return <LabResultClient labResults={labResults} userId={userId}/>;
};

export default labresult;
