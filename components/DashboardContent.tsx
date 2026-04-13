"use client";

import { useLanguage } from "@/context/LanguageContext";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import LogoutButton from "@/components/ui/LogOutButton";
import { FeedbackForm } from "@/components/forms/Feedbackform";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface DashboardContentProps {
  userId: string;
  patient: any;
  appointments: any[];
  labTestRequests: any[];
  labResults: any[];
}

export const DashboardContent = ({
  userId,
  patient,
  appointments,
  labTestRequests,
  labResults,
}: DashboardContentProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex h-screen bg-[#740938] relative overflow-hidden">
      {/* Sidebar: Actions */}
      <aside className="w-1/4 max-w-[260px] p-5 bg-[#AF1740] shadow-md flex flex-col h-full">
        {/* Language Switcher - Now in Sidebar to avoid overlap */}
        <div className="mb-8">
          <LanguageSwitcher />
        </div>

        <div className="flex-1 overflow-y-hidden">
          <h2 className="text-xl font-bold text-white mb-6 underline decoration-[#ffcf56] decoration-4 underline-offset-8">{t("actions")}</h2>
          <div className="space-y-3">
            <Link
              href={`/patients/${userId}/medical-information`}
              className="block w-full text-center bg-[#CC2B52] text-white py-2.5 px-4 rounded-xl shadow-lg border border-[#740938]/20 hover:scale-105 transition-transform text-sm font-semibold"
            >
              {t("viewMedicalInfo")}
            </Link>
            <Link
              href={`/patients/${userId}/new-appointment`}
              className="block w-full text-center bg-[#CC2B52] text-white py-2.5 px-4 rounded-xl shadow-lg border border-[#740938]/20 hover:scale-105 transition-transform text-sm font-semibold"
            >
              {t("bookAppointment")}
            </Link>
            <Link
              href={`/patients/${userId}/LabTestRequest`}
              className="block w-full text-center bg-[#CC2B52] text-white py-2.5 px-4 rounded-xl shadow-lg border border-[#740938]/20 hover:scale-105 transition-transform text-sm font-semibold"
            >
              {t("requestLabTest")}
            </Link>
            <Link
              href={`/patients/${userId}/prescriptions`}
              className="block w-full text-center bg-[#CC2B52] text-white py-2.5 px-4 rounded-xl shadow-lg border border-[#740938]/20 hover:scale-105 transition-transform text-sm font-semibold"
            >
              {t("viewPrescriptions")}
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#fdf2f2] shadow-inner rounded-l-[40px] flex flex-col h-full overflow-hidden">
        <header className="text-left mb-6">
          <h1 className="text-3xl font-extrabold text-[#740938]">
            {t("dashboardWelcome")}, <span className="text-[#AF1740]">{patient.name}</span>!
          </h1>
          <p className="text-[#CC2B52] font-semibold mt-1 text-sm">{t("healthJourney")}</p>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
          {/* Upcoming Appointments */}
          <section className="bg-white p-5 rounded-[2rem] shadow-xl border-l-[10px] border-[#AF1740] flex flex-col min-h-0">
            <h2 className="text-xl font-bold mb-3 text-[#740938] flex items-center gap-2 shrink-0">
              📅 {t("upcomingAppointments")}
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 remove-scrollbar">
              <ul className="space-y-3">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <li key={appointment.$id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                      <div className="text-sm text-gray-700 font-medium">
                         {formatDateTime(appointment.schedule).dateTime} with <span className="text-[#AF1740] font-bold">Dr. {appointment.primaryPhysician}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-sm">{t("noUpcomingAppointments")}</p>
                )}
              </ul>
            </div>
          </section>

          {/* Recent Lab Results */}
          <section className="bg-white p-5 rounded-[2rem] shadow-xl border-l-[10px] border-[#CC2B52] flex flex-col min-h-0">
            <h2 className="text-xl font-bold mb-3 text-[#740938] flex items-center gap-2 shrink-0">
              🧪 {t("recentLabResults")}
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 remove-scrollbar">
              <ul className="space-y-3">
                {labTestRequests.length > 0 ? (
                  labTestRequests.map((labTest) => {
                    const result = labResults.find(
                      (labResult) =>
                        labResult.testCategory === labTest.testCategory &&
                        labResult.specifiedTest === labTest.specifiedTest
                    );

                    return (
                      <li key={labTest.$id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                          <p className="font-bold text-[#740938] text-sm">
                            {labTest.testCategory}
                          </p>
                          <p className="text-xs font-medium">
                             <span className={result ? "text-green-600" : "text-amber-600 font-bold"}>{result ? t("statusDone") : t("statusPending")}</span>
                          </p>
                        </div>
                        <Link
                          href={`/patients/${userId}/LabResults`}
                          className={`inline-block py-1.5 px-4 rounded-full font-bold text-xs shadow-md transition-all ${
                            result
                              ? "bg-[#AF1740] text-white hover:bg-[#740938]"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {result ? t("viewResultBtn") : t("statusPending")}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <p className="text-gray-500 italic text-sm">{t("noRecentLabResults")}</p>
                )}
              </ul>
            </div>
          </section>



          {/* Health Summary Row */}
          <div className="lg:col-span-2 min-h-0">
            {/* Health Summary */}
            <section className="h-full bg-gradient-to-br from-[#AF1740] to-[#CC2B52] p-6 rounded-[2rem] shadow-2xl text-white flex flex-col justify-center min-h-0">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 shrink-0">
                💪 {t("healthSummary")}
              </h2>
              <p className="text-sm leading-relaxed opacity-95 font-medium overflow-y-auto remove-scrollbar">
                {t("healthSummaryText")}
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar: Feedback */}
      <aside className="w-1/5 max-w-[220px] p-5 bg-[#740938] shadow-md flex flex-col h-full">
        <div className="mt-4 flex-1">
          <h2 className="text-xl font-bold text-white mb-6 underline decoration-[#ffcf56] decoration-4 underline-offset-8">{t("feedback")}</h2>
          <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-y-auto max-h-[80%] remove-scrollbar">
            <FeedbackForm userId={userId} />
          </div>
        </div>
      </aside>
    </div>
  );
};
