import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex flex-col space-y-12 bg-[#740938] min-h-screen text-white pb-20">
      {/* Header - Sleek Black Bar */}
      <div className="px-6 md:px-16 pt-8">
        <header className="flex justify-between items-center py-5 px-10 bg-black rounded-2xl shadow-xl">
          <Link href="/" className="cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.ico"
                height={32}
                width={32}
                alt="logo"
                className="h-8 w-fit"
              />
              <span className="text-xl font-bold text-white tracking-tight">CarePulse</span>
            </div>
          </Link>
          <p className="text-xl font-bold tracking-tight">Admin Dashboard</p>
        </header>
      </div>

      <main className="flex flex-col gap-14 px-6 md:px-16 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <section className="space-y-3">
          <h1 className="text-5xl font-extrabold">Welcome 👋</h1>
          <p className="text-gray-200 text-xl font-medium">Start the day with managing new appointments</p>
        </section>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {/* Data Table Section */}
        <section className="rounded-2xl overflow-hidden shadow-2xl">
          <DataTable columns={columns} data={appointments.documents} />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
