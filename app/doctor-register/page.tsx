"use client"

import React from 'react';
import Image from 'next/image';
import DoctorLoginForm from '@/components/forms/DoctorForm';
//import { DoctorLoginForm } from '@/components/forms/DoctorForm';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const DoctorRegister = () => {
  return (
    <div className="flex h-screen max-h-screen relative">
      {/* Language Switcher - Absolute Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <section className="remove-scrollbar container my-auto">
        {/* Left Side: Logo and Form */}
        <div className="sub-container max-w-[496px]">
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
          <DoctorLoginForm />
          <div className="text-14-regular mt-12 w-full text-center lg:text-left">
            <p className="text-dark-600">© 2025 CarePulse</p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />


    </div>
  );
};

export default DoctorRegister;
