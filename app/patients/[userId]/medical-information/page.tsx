import MedicalInformationClient from "@/components/forms/MedicalInformationClient";
import { getPatient } from "@/lib/actions/patient.actions";


const MedicalInformation = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  const patient = await getPatient(userId);

  if (!patient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600">Medical information not found!</p>
      </div>
    );
  }

 
  return <MedicalInformationClient patient={patient} userId={userId} />;
};

export default MedicalInformation;
