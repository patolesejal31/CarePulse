 
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser, getPatient } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";

import { useLanguage } from "@/context/LanguageContext";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { t } = useLanguage();
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  useEffect(() => {
    // router.events is not available in App Router. 
    // Navigation is handled by Next.js automatically.
  }, [router]);
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        const patient = await getPatient(newUser.$id);
        if (patient) {
          router.push(`/patients/${newUser.$id}/dashboard`);
        } else {
          router.push(`/patients/${newUser.$id}/register`);
        }
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header text-white">{t("hiThere")}</h1>
          <p className="text-dark-700">{t("getStartedDesc")}</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label={t("fullName")}
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label={t("emailLabel")}
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label={t("phoneLabel")}
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>
          {t("getStartedBtn")}
        </SubmitButton>
      </form>
    </Form>
  );
};
