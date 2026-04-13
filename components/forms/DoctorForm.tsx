import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Client, Databases, Query } from "node-appwrite";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/ui/CustomFormField";
import SubmitButton from "@/components/ui/SubmitButton";
import CustomModal from "@/components/ui/CustomModal"; // Import the custom modal

const DoctorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("6717ba3f003448972ea1"); // Your Appwrite project ID

const databases = new Databases(client);

const DoctorLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Track forgot password flow
  const [doctorEmail, setDoctorEmail] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalStep, setModalStep] = useState<"email" | "security" | "newPassword">("email");
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof DoctorLoginSchema>>({
    resolver: zodResolver(DoctorLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    // Navigation events are handled by App Router automatically
  }, [router]);

  const onSubmit = async (values: z.infer<typeof DoctorLoginSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Query the database to find the doctor by email
      const doctors = await databases.listDocuments(
        "672cd052000155a2740d", // Replace with your database ID
        "672cd14e0035fd25da8a", // Replace with your collection ID
        [Query.equal("email", values.email)]
      );

      if (doctors.total === 0) {
        throw new Error("Doctor not found");
      }

      const doctor = doctors.documents[0];
      if (doctor.password !== values.password) {
        throw new Error("Invalid password");
      }

      // Successful login, redirect to the doctor's dashboard
      router.push(`/doctor/${doctor.$id}/dashboard`);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setErrorMessage("");
    setSuccessMessage("");
    setModalStep("email"); // Start with email step
  };

  const handleEmailSubmit = async () => {
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    const doctors = await databases.listDocuments(
      "672cd052000155a2740d", // Database ID
      "672cd14e0035fd25da8a", // Collection ID
      [Query.equal("email", doctorEmail)]
    );

    if (doctors.total === 0) {
      setErrorMessage("Doctor not found.");
      return;
    }

    setModalStep("security");
  };

  const handleSecurityCodeSubmit = () => {
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    if (securityCode === "111111") {
      setModalStep("newPassword");
    } else {
      setErrorMessage("Invalid security code.");
    }
  };

  const handleNewPasswordSubmit = async () => {
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    // Update password in the database
    const doctors = await databases.listDocuments(
      "672cd052000155a2740d", // Database ID
      "672cd14e0035fd25da8a", // Collection ID
      [Query.equal("email", doctorEmail)]
    );

    if (doctors.total > 0) {
      const doctor = doctors.documents[0];
      await databases.updateDocument(
        "672cd052000155a2740d", // Database ID
        "672cd14e0035fd25da8a", // Collection ID
        doctor.$id,
        { password: newPassword }
      );
      setSuccessMessage("Password reset successfully.");
      setIsForgotPassword(false); // Return to login after successful password reset
    }
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false); // Return to login screen
    setDoctorEmail("");
    setSecurityCode("");
    setNewPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <Form {...form}>
      {!isForgotPassword ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <section className="mb-12 space-y-4">
            <h1 className="header text-white">{t("doctorLogin")}</h1>
            <p className="text-dark-700">{t("signInDesc")}</p>
          </section>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-500 text-xl-sm">{successMessage}</p>
          )}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="doctor@example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            iconSrc="/assets/icons/lock.svg"
            iconAlt="password"
          />

          <SubmitButton isLoading={isLoading}>{t("logInBtn")}</SubmitButton>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="mt-4 text-green-500"
          >
            Forgot Password?
          </button>
        </form>
      ) : (
        <div>
          {/* Forgot Password Steps */}
          {modalStep === "email" && (
            <div>
              {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
              <p className="text-white">Please enter your email address:</p>
              <input
                type="email"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                placeholder="doctor@example.com"
                className="border p-2 w-full"
              />
              <button
                onClick={handleEmailSubmit}
                className="bg-blue-500 text-white p-2 mt-4"
              >
                Next
              </button>
              <button
                onClick={handleBackToLogin}
                className="bg-gray-500 text-white p-2 mt-4 ml-4"
              >
                Back
              </button>
            </div>
          )}

          {modalStep === "security" && (
            <div>
              {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
              <p className="text-white">Enter the 6-digit security code:</p>
              <input
                type="text"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="border p-2 w-full"
                maxLength={6}
              />
              <button
                onClick={handleSecurityCodeSubmit}
                className="bg-blue-500 text-white p-2 mt-4"
              >
                Next
              </button>
              <button
                onClick={handleBackToLogin}
                className="bg-gray-500 text-white p-2 mt-4 ml-4"
              >
                Back
              </button>
            </div>
          )}

          {modalStep === "newPassword" && (
            <div>
              <p className="text-white">Enter your new password:</p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 w-full"
              />
              <button
                onClick={handleNewPasswordSubmit}
                className="bg-blue-500 text-white p-2 mt-4"
              >
                Reset Password
              </button>
              <button
                onClick={handleBackToLogin}
                className="bg-gray-500 text-white p-2 mt-4 ml-4"
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}
    </Form>
  );
};

export default DoctorLoginForm;
