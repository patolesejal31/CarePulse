
import Image from "next/image";
import Link from "next/link";
import { Doctors } from "@/constants";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { getLabTestRequest } from "@/lib/actions/labtest.actions";

const LabTestSuccess = async ({
  searchParams,params:{userId},
  }: SearchParamProps) => {
  const newLabTestId = (searchParams?.newLabTestId as string)|| "";
  const labTestRequest = await getLabTestRequest(newLabTestId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === labTestRequest.primaryPhysician
  
  );

  
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <div className="flex items-center gap-3">
             <Image
               src="/favicon.ico"
               height={40}
               width={40}
               alt="logo"
               className="h-10 w-auto"
             />
             <span className="text-2xl font-bold text-white tracking-tight">CarePulse</span>
          </div>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center text-white">
            Your <span className="text-green-500">lab test request</span> has
            been successfully submitted!
          </h2>
          <p className="text-white">We&apos;ll notify you once your Lab Result is out.</p>
        </section>

        <div className="flex gap-4">
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/LabTestRequest`}>
            Request Another Lab Test
          </Link>
        </Button>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/dashboard`}>
            Go To Dashboard
          </Link>
        </Button>
        </div>

        <p className="copyright">© 2025 CarePulse</p>
      </div>
    </div>
  );
};

export default LabTestSuccess;
