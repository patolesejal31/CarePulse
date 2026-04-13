"use client";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form } from "../ui/form";
import { SelectItem } from "@/components/ui/select";
import { databases } from "@/lib/appwrite.config";
import { getDoctorDetails, getAllPatients } from "@/lib/actions/prescription.actions";
import CustomFormField, { FormFieldType } from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import Alert from "../Alert/alert";


const prescriptionSchema = z.object({
  doctorName: z.string().min(1, "Doctor's name is required"),
  patientName: z.string().min(1, "Patient's name is required"),
  medicines: z
    .array(
      z.object({
        name: z.string().min(1, "Medicine name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        frequency: z.string().min(1, "Frequency is required"),
      })
    )
    .nonempty("At least one medicine is required"),
  notes: z.string().optional(),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

type PrescriptionFormProps = {
  doctorId: string;
  isLoading: boolean;
  buttonLabel: string;
};

export const PrescriptionForm = ({ doctorId, isLoading, buttonLabel }: PrescriptionFormProps) => {
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      doctorName: "",
      patientName: "",
      medicines: [{ name: "", dosage: "", frequency: "" }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medicines",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const doctorDetails = await getDoctorDetails(doctorId);

        // Use a timeout to delay `form.setValue` to avoid updating during render
        setTimeout(() => {
          form.setValue("doctorName", doctorDetails?.doctorName || "");
        }, 0);

        const patientList = await getAllPatients();
        //@ts-ignore
        setPatients(patientList || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [doctorId, form]);
  const onSubmit = async (data: PrescriptionFormValues) => {
    // Check if at least one medicine row is filled
    const hasValidMedicine = data.medicines.some(
      (med) => med.name.trim() !== "" || med.dosage.trim() !== "" || med.frequency.trim() !== ""
    );
  
    if (!hasValidMedicine) {
      setAlertMessage("Please fill at least one medicine row before submitting.");
      setShowAlert(true);
      // Hide the alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
  
    try {
      const commonFields = {
        doctorName: data.doctorName,
        patientName: data.patientName,
        notes: data.notes || "",
      };
  
      // Save each medicine entry as a document
      const responses = await Promise.all(
        data.medicines.map((med) =>
          databases.createDocument(
            "672cd052000155a2740d", // Database ID
            "677f931f001d0746bbb0", // Collection ID
            "unique()", // Unique ID for the document
            {
              ...commonFields,
              medicationName: med.name,
              dosage: med.dosage,
              frequency: med.frequency,
            }
          )
        )
      );
  
      console.log("Medicines saved successfully:", responses);
      setAlertMessage("Prescription created successfully!");
      setShowAlert(true);
      
      // Reset the form after successful submission
      form.reset({
        doctorName: "",
        patientName: "",
        medicines: [{ name: "", dosage: "", frequency: "" }],
        notes: "",
      });
    } catch (error) {
      console.error("Error saving prescription:", error);
      setAlertMessage("Failed to save the prescription. Please try again.");
      setShowAlert(true);
    }
  
    // Hide the alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header text-white">New Prescription</h1>
          <p className="text-dark-700">Create a new prescription easily.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="doctorName"
          label="Doctor's Name"
          placeholder="Enter the doctor's name"
          //@ts-ignore
          readOnly
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="patientName"
          label="Patient"
          placeholder="Select a patient"
        >
          {patients?.map((patient) => (
            //@ts-ignore
            <SelectItem key={patient.userId} value={patient.name}>
              {patient.name}
            </SelectItem>
          ))}
        </CustomFormField>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-dark-700">Medicines</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Medicine Name</th>
                <th className="border border-gray-300 px-4 py-2">Dosage</th>
                <th className="border border-gray-300 px-4 py-2">Frequency</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name={`medicines.${index}.name` as const}
                      placeholder="Medicine name"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name={`medicines.${index}.dosage` as const}
                      placeholder="Dosage"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name={`medicines.${index}.frequency` as const}
                      placeholder="Frequency"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="shad-danger-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => append({ name: "", dosage: "", frequency: "" })}
            className="shad-primary-btn mt-4"
          >
            Add Medicine
          </button>
        </section>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="notes"
          label="Notes"
          placeholder="Add any additional notes"
        />

        <SubmitButton isLoading={isLoading} className="shad-primary-btn w-full">
          {buttonLabel} Submit
        </SubmitButton>
      </form>

      {/* Custom alert */}
      <Alert message={alertMessage} showAlert={showAlert} onClose={() => setShowAlert(false)} />
    </Form>
  );
};
