import { PatientForm } from '@/components/forms/PatientForm';
import React from 'react';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const PatientRegister = () => {
  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-[#740938] relative">
      {/* Language Switcher - Absolute Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      {/* Left Side: Form Section */}
      <section className="flex-1 flex flex-col justify-between px-8 md:px-20 py-12 overflow-y-auto remove-scrollbar">
        <div className="w-full max-w-[496px] mx-auto flex flex-col gap-10">
          <div className="flex items-center gap-2 mb-12">
            <Image
              src="/favicon.ico"
              height={40}
              width={40}
              alt="CarePulse"
              className="h-10 w-auto"
            />
            <span className="text-3xl font-bold text-white tracking-tight">CarePulse</span>
          </div>

          {/* Form */}
          <PatientForm />

          {/* Footer */}
          <div className="mt-8 text-white/60 text-sm">
            <p>© 2025 CarePulse</p>
          </div>
        </div>
      </section>

      {/* Right Side: Image Section */}
      <div className="hidden lg:block w-1/2 h-full">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1200}
          width={1000}
          alt="Healthcare professionals"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PatientRegister;
