
import PrescriptionClient from "@/components/forms/precriptionview";
import { getPrescriptions } from "@/lib/actions/prescription.actions";

const Prescription = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  const prescriptions = await getPrescriptions(userId);

  if (!prescriptions || prescriptions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white-600">No prescriptions found!</p>
      </div>
    );
  }

  return <PrescriptionClient prescriptions={prescriptions} userId={userId} />;
};

export default Prescription;
