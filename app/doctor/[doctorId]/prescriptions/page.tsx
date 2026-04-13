import Image from "next/image";


import { getPrescription } from "@/lib/actions/prescription.actions";
import { PrescriptionForm } from "@/components/forms/PrescriptionForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const PrescriptionsPage = async (props: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await props.params;
  const doctor = await getPrescription(doctorId);

  return (
    <div className="flex h-screen over-flow-y">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex items-center gap-3 mb-12">
            <Image
              src="/favicon.ico"
              height={40}
              width={40}
              alt="CarePulse"
              className="h-10 w-auto"
            />
            <span className="text-3xl font-bold text-[#740938] tracking-tight">CarePulse</span>
          </div>

          <PrescriptionForm
            doctorId={doctorId} isLoading={false} buttonLabel={""} /
          >

          <br></br>
          <br></br>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/doctor/${doctorId}/dashboard`}>
              Go To Dashboard
            </Link>
          </Button>
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

export default getPrescription;