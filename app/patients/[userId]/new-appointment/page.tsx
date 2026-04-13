import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";


const Appointment = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
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

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2025 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;