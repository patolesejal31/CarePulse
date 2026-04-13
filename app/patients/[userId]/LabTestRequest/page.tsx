import Image from "next/image";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import LabTestForm from "@/components/forms/LabTestForm";

const LabTestRequest = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  if (!userId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Invalid or missing user ID.</p>
      </div>
    );
  }

  let patient = null;
  let user = null;

  try {
    patient = await getPatient(userId);
    user = await getUser(userId);
  } catch (error) {
    console.error("Error fetching patient or user data:", error);
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Failed to load patient or user information.</p>
      </div>
    );
  }

  if (!patient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Patient or user information not found!</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen over-flow-y-auto">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex items-center gap-3 mb-12">
            <Image
              src="/favicon.ico"
              height={40}
              width={40}
              alt="CarePulse"
              className="h-10 w-auto"
            />
            <span className="text-3xl font-bold text-white tracking-tight">CarePulse</span>
          </div>
          <LabTestForm
            userId={userId || ""}
            patientId={patient?.$id || ""}
            type="create"
          />
          <p className="copyright mt-10 py-12">© 2025 CarePulse</p>
        </div>
      </section>
      <div className="relative hidden lg:block sticky top-0 h-screen max-w-[390px]">
      <Image
        src="/assets/images/appointment-img.png"
        height={4000}
        width={1500}
        alt="Appointment illustration"
        className="side-img max-w-[390px]"
      />
      </div>
    </div>
  );
};

export default LabTestRequest;
