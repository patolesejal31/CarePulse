import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Register = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/dashboard`);

  return (
    <div className="flex h-screen max-h-screen relative bg-[#740938]">
      {/* Language Switcher - Absolute Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <section className="remove-scrollbar container my-auto">
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

          <RegisterForm user={user} />

          <p className="copyright py-12 text-white/60">© 2025 CarePulse</p>
        </div>
      </section>
      
    </div>
  );
};

export default Register;