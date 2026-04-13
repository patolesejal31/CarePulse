import HomeSection from "./HomeSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonalsSection";
import DoctorsSection from "./DoctorsSection";
import Footer from "./FooterSection";
import { PasskeyModal } from "@/components/PasskeyModal";
import { AdminButton } from "@/components/AdminButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import Image from "next/image";

const HomePage = async (props: {
  searchParams: Promise<{ admin?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#740938] overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] w-full bg-[#740938]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-16 lg:px-24 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
           <Image
            src="/favicon.ico"
            alt="CarePulse"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold text-white tracking-tight">CarePulse</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-white font-medium">
          <a href="#" className="hover:text-[#ffcf56] transition-colors">Home</a>
          <a href="#features" className="hover:text-[#ffcf56] transition-colors">Features</a>
          <a href="#doctors" className="hover:text-[#ffcf56] transition-colors">Doctors</a>
          <AdminButton />
          <LanguageSwitcher />
        </nav>

        <div className="md:hidden flex items-center gap-4">
           <LanguageSwitcher />
           <AdminButton />
        </div>
      </header>

      {/* Modal */}
      {isAdmin && <PasskeyModal />}

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52]">
           <HomeSection />
        </div>
        
        <div id="features">
           <FeaturesSection />
        </div>

        <div id="doctors">
           <DoctorsSection />
        </div>

        <div id="testimonials">
           <TestimonialsSection />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default HomePage;